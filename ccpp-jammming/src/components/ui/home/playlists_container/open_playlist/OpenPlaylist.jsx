import React, { useState, useEffect } from "react";
import { useSave } from "../../../../../hooks/user_hooks/SaveContext"; // Import the Save context
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo";
import PlaylistTrack from "./track/PlaylistTrack";
import usePlaylistActions from "../../../../../hooks/user_hooks/usePlaylistActions";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import useMenagePlaylistItems from '../../../../../hooks/user_hooks/useMenagePlaylistItems';

// Separate cache for OpenPlaylist state (tracks, saved status, etc.)
const playlistStateCache = {};

// Component
function OpenPlaylist({ playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { playlistTracksArr, setPlaylistTracksArr, handleTrackChange, clearPlaylistCache } = usePlaylistInfo({ playlistData, accessToken });
    const { setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist, reorderTracksInPlaylist, newEditedName } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });
    const { handleDeleteTrack } = useMenagePlaylistItems({ playlistData, playlistTracksArr, setPlaylistTracksArr, clearPlaylistCache, accessToken });

    // Separate local states for tracks, reset state, and initialization flag
    const [localTracks, setLocalTracks] = useState([]);
    const [resetTrackSaved, setResetTrackSaved] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);  // State to store timeout ID

    // Import the save context functions for this playlist
    const { getIsSaved, setIsSaved } = useSave();
    const isSaved = getIsSaved(playlistData.playlistId); // Get saved state for the specific playlist

    // Initialize tracks and saved state independently, with cache and API
    useEffect(() => {
        if (playlistStateCache[playlistData.playlistId]) {
            setLocalTracks(playlistStateCache[playlistData.playlistId].tracks);
            setIsSaved(playlistData.playlistId, playlistStateCache[playlistData.playlistId].isSaved); // Update saved state for the playlist
        } else {
            setLocalTracks(playlistTracksArr);
            setIsSaved(playlistData.playlistId, true);
        }
        setIsInitialized(true);
    }, [playlistData.playlistId, playlistTracksArr, setIsSaved]);

    // Debounce function to prevent rapid updates
    const debounceStateUpdate = (callback, delay) => {
        if (timeoutId) {
            clearTimeout(timeoutId);  // Clear any existing timeouts
        }
        const newTimeoutId = setTimeout(callback, delay);  // Set a new timeout
        setTimeoutId(newTimeoutId);  // Store the new timeout ID
    };

    // Function to handle drag end and update track order locally
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = localTracks.findIndex((track) => track.trackUri === active.id);
            const newIndex = localTracks.findIndex((track) => track.trackUri === over.id);
            const reorderedTracks = arrayMove(localTracks, oldIndex, newIndex);
            setLocalTracks(reorderedTracks);
            debounceStateUpdate(() => setIsSaved(playlistData.playlistId, false), 300);  // Debounce setting unsaved state
            handleTrackChange();  // Clear cache after track order change
            playlistStateCache[playlistData.playlistId] = { tracks: reorderedTracks, isSaved: false };  // Update local cache
        }
    };

    // Handle saving changes and update saved state/cache independently
    const handleSaveChanges = async () => {
        const uris = localTracks.map(track => track.trackUri);  // Get URIs from local state
        try {
            await reorderTracksInPlaylist(playlistData.playlistId, uris);  // Save changes via Spotify API
            setPlaylistTracksArr(localTracks);
            playlistStateCache[playlistData.playlistId] = { tracks: localTracks, isSaved: true };  // Update cache after saving
            debounceStateUpdate(() => setIsSaved(playlistData.playlistId, true), 300); // Debounce setting saved state
            clearPlaylistCache(playlistData.playlistId);  // Clear cache after saving
            setResetTrackSaved(true);
            setTimeout(() => setResetTrackSaved(false), 100);  // Reset timeout
        } catch (error) {
            console.error("Error saving reordered tracks:", error);
        }
    };

    // Handle discarding changes and reset to last fetched data
    const handleDiscardChanges = () => {
        setLocalTracks(playlistTracksArr);  // Reset to original data
        debounceStateUpdate(() => setIsSaved(playlistData.playlistId, true), 300);  // Debounce setting saved state
        setResetTrackSaved(true);
        setTimeout(() => setResetTrackSaved(false), 100);  // Reset timeout
        delete playlistStateCache[playlistData.playlistId];  // Clear cache after discard
        clearPlaylistCache(playlistData.playlistId);  // Ensure cache is refreshed after discard
    };

    // Pre-delete track function to remove a track
    const preDeleteTrack = (uriTrack) => {
        const confirmed = window.confirm("Are you sure you want to remove this track?");
        if (confirmed) {
            const updatedTracks = localTracks.filter(track => track.trackUri !== uriTrack);  // Filter out the deleted track

            // Update the local state of tracks
            setLocalTracks(updatedTracks);

            // Immediately compare and update hasChanges
            const hasChangesNow = JSON.stringify(updatedTracks) !== JSON.stringify(playlistTracksArr);

            // Update isSaved and hasChanges immediately
            setIsSaved(playlistData.playlistId, !hasChangesNow);
            playlistStateCache[playlistData.playlistId] = { tracks: updatedTracks, isSaved: !hasChangesNow };  // Update local cache

            // Clear the current cache after deletion
            handleTrackChange();  // Clear the cache for the playlist to force refresh
        }
    };

    // Detect if there are unsaved changes independently
    const hasChanges = JSON.stringify(localTracks) !== JSON.stringify(playlistTracksArr);

    // Update saved state for buttons and icon after initialization
    useEffect(() => {
        if (isInitialized) {
            debounceStateUpdate(() => setIsSaved(playlistData.playlistId, !hasChanges), 300);  // Debounce setting state to prevent rapid updates
        }
    }, [hasChanges, isInitialized, playlistData.playlistId, setIsSaved]);

    return (
        <>
            <div id="open-pl-container" className="container-fluid d-flex flex-column">
                <header id="open-pl-header" className="row">
                    <div id="go-back-col" className="col-auto d-flex flex-column justify-content-center align-items-start">
                        <a id="back-to-playlists" type="button" onClick={() => onBackClick()}>
                            <img src={IMG.gobackPNG} alt="go back button" width="22px" />
                        </a>
                    </div>
                    <div id="title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <h3 className="align-items-center">{newEditedName}</h3>
                    </div>
                    <div id="checkmark-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img 
                            id="saved-icon" 
                            src={isSaved ? IMG.savedPNG : IMG.unsavedPNG}  // Update the icon based on save state for this playlist
                            alt="saved icon" 
                            width="27px" 
                        />
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="edit-button" type="button" onClick={handleEditPlaylist}>
                            <img src={IMG.pencilPNG} alt="edit icon" width="27px" />
                        </a>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="share-button" type="button" onClick={handleSharePlaylist}>
                            <img src={IMG.sharePNG} alt="share icon" width="27px" />
                        </a>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="delete-button" type="button" onClick={() => {
                            handleUnfollowPlaylist();
                            setTimeout(() => {
                                onBackClick();
                            }, 500);
                        }}>
                            <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                        </a>
                    </div>
                </header>
                <main id="open-pl-main" className="row flex-grow-1">
                    <div id="open-pl-col" className="col d-flex flex-column">
                        <div id="top-labels" className="row">
                            <div id="col-num" className="col-1 d-flex justify-content-start align-items-end">#</div>
                            <div id="col-cover" className="col-1 d-flex justify-content-start align-items-end"></div>
                            <div id="col-title" className="col d-flex justify-content-start align-items-end">title</div>
                            <div id="col-album" className="col-2 d-flex justify-content-start align-items-end">album</div>
                            <div id="col-duration" className="col-1 d-flex justify-content-center align-items-end">
                                <img src={IMG.clockPNG} alt="clock icon" height="15px" />
                            </div>
                            <div id="col-minus" className="col-1 d-flex justify-content-start align-items-end"></div>
                        </div>
                        <div id="tracks-list" className="row flex-grow-1">
                            <div id="tracks-list-col" className="col">
                                <DndContext onDragEnd={handleDragEnd}>
                                    <SortableContext items={localTracks.map(track => track.trackUri)} strategy={verticalListSortingStrategy}>
                                        {localTracks.map((track, i) => (
                                            <PlaylistTrack
                                                order={i}
                                                playlistTrack={track}
                                                playlistTracksArr={localTracks}
                                                setPlaylistTracksArr={setPlaylistTracksArr}
                                                onPlayButton={onPlayButton}
                                                onArtistClick={onArtistClick}
                                                onAlbumClick={onAlbumClick}
                                                playTrack={playTrack}
                                                pauseTrack={pauseTrack}
                                                preDeleteTrack={preDeleteTrack}
                                                accessToken={accessToken}
                                                key={track.trackUri}
                                                resetTrackSaved={resetTrackSaved}  // Pass reset state to PlaylistTrack
                                            />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </div>
                        </div>
                    </div>
                </main>
                <footer id="open-pl-footer" className="row">
                    <div className="col-1 d-flex flex-column justify-content-center align-items-center"></div>
                    <div id="save-button-col" className="col-5 d-flex flex-column justify-content-center align-items-center">
                        <button id="save-button" className={`btn btn-lg ${hasChanges ? 'btn-primary' : 'btn-outline-light'}`} onClick={handleSaveChanges} disabled={!hasChanges}>
                            Save to Spotify
                        </button>
                    </div>
                    <div id="discard-button-col" className="col-5 d-flex flex-column justify-content-center align-items-center">
                        <button id="discard-button" className={`btn btn-lg ${hasChanges ? 'btn-danger' : 'btn-outline-light'}`} onClick={handleDiscardChanges} disabled={!hasChanges}>
                            Discard Changes
                        </button>
                    </div>
                    <div className="col-1 d-flex flex-column justify-content-center align-items-center"></div>
                </footer>
            </div>
        </>
    );
}

export default OpenPlaylist;