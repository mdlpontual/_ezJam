import React, { useState, useEffect } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo";
import PlaylistTrack from "./track/PlaylistTrack";
import usePlaylistActions from "../../../../../hooks/user_hooks/usePlaylistActions";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

function OpenPlaylist({ playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { playlistTracksArr, setPlaylistTracksArr } = usePlaylistInfo({ playlistData, accessToken });
    const { setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist, reorderTracksInPlaylist, newEditedName } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });
    
    const [localTracks, setLocalTracks] = useState([]);  // Local state for changes
    const [isSaved, setIsSaved] = useState(true);  // State to track whether the playlist is saved or unsaved
    const [resetTrackSaved, setResetTrackSaved] = useState(false);  // State to reset individual track saved status

    // Initialize localTracks with the fetched playlist tracks
    useEffect(() => {
        setLocalTracks(playlistTracksArr);
        setIsSaved(true);  // Initially set the playlist as saved when fetched
    }, [playlistTracksArr]);

    // Function to handle drag end event and update the track order locally
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = localTracks.findIndex((track) => track.trackUri === active.id);
            const newIndex = localTracks.findIndex((track) => track.trackUri === over.id);
            const reorderedTracks = arrayMove(localTracks, oldIndex, newIndex);
            setLocalTracks(reorderedTracks);  // Update the local track order
            setIsSaved(false);  // Mark as unsaved when changes are made
        }
    };

    // Function to handle saving the changes to Spotify
    const handleSaveChanges = async () => {
        const uris = localTracks.map(track => track.trackUri); // Get URIs from the local state
        try {
            await reorderTracksInPlaylist(playlistData.playlistId, uris);  // Save changes to the Spotify API
            setPlaylistTracksArr(localTracks);  // Update the fetched state to match the saved state
            setIsSaved(true);  // Mark the playlist as saved
            setResetTrackSaved(true);  // Reset track saved state
            setTimeout(() => setResetTrackSaved(false), 100);  // Small timeout to allow for reset
            alert('Changes saved successfully!');
        } catch (error) {
            console.error("Error saving reordered tracks:", error);
        }
    };

    // Function to discard local changes and reset to last fetched data
    const handleDiscardChanges = () => {
        setLocalTracks(playlistTracksArr);  // Reset to the original fetched playlist
        setIsSaved(true);  // Mark as saved since changes are discarded
        setResetTrackSaved(true);  // Reset track saved state
        setTimeout(() => setResetTrackSaved(false), 100);  // Small timeout to allow for reset
    };

    // Function to compare localTracks and playlistTracksArr to see if there are changes
    const hasChanges = JSON.stringify(localTracks) !== JSON.stringify(playlistTracksArr);

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
                            src={isSaved ? IMG.savedPNG : IMG.unsavedPNG}  // Update the icon based on saved state
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
                            <div id="col-saved" className="col-1 d-flex justify-content-start align-items-end"></div>
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
                                                onPlayButton={onPlayButton}
                                                onArtistClick={onArtistClick}
                                                onAlbumClick={onAlbumClick}
                                                playTrack={playTrack}
                                                pauseTrack={pauseTrack}
                                                accessToken={accessToken}
                                                key={track.trackUri}
                                                resetTrackSaved={resetTrackSaved}  // Pass the reset state to PlaylistTrack
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
                        <button
                            id="save-button"
                            className={`btn btn-lg ${hasChanges ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={handleSaveChanges}
                            disabled={!hasChanges}
                        >
                            Save to Spotify
                        </button>
                    </div>
                    <div id="discard-button-col" className="col-5 d-flex flex-column justify-content-center align-items-center">
                        <button
                            id="discard-button"
                            className={`btn btn-lg ${hasChanges ? 'btn-danger' : 'btn-outline-light'}`}
                            onClick={handleDiscardChanges}
                            disabled={!hasChanges}
                        >
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