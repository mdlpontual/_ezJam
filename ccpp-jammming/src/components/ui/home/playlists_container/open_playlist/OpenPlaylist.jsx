import React, { useState, useEffect } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo";
import PlaylistTrack from "./track/PlaylistTrack";
import usePlaylistActions from "../../../../../hooks/user_hooks/usePlaylistActions";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Separate cache for OpenPlaylist state (tracks, saved status, etc.)
const playlistStateCache = {};

// Component
function OpenPlaylist({ playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { playlistTracksArr, setPlaylistTracksArr, handleTrackChange, clearPlaylistCache } = usePlaylistInfo({ playlistData, accessToken });
    const { setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist, reorderTracksInPlaylist, newEditedName } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });

    // Separate local states for tracks, save status, and initialization flag
    const [localTracks, setLocalTracks] = useState([]);
    const [isSaved, setIsSaved] = useState(true);
    const [resetTrackSaved, setResetTrackSaved] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize tracks and saved state independently, with cache and API
    useEffect(() => {
        if (playlistStateCache[playlistData.playlistId]) {
            setLocalTracks(playlistStateCache[playlistData.playlistId].tracks);
            setIsSaved(playlistStateCache[playlistData.playlistId].isSaved);
        } else {
            setLocalTracks(playlistTracksArr);
            setIsSaved(true);
        }
        setIsInitialized(true);
    }, [playlistData.playlistId, playlistTracksArr]);

    // Function to handle drag end and update track order locally
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = localTracks.findIndex((track) => track.trackUri === active.id);
            const newIndex = localTracks.findIndex((track) => track.trackUri === over.id);
            const reorderedTracks = arrayMove(localTracks, oldIndex, newIndex);
            setLocalTracks(reorderedTracks);
            setIsSaved(false);  // Mark as unsaved after drag and drop
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
            setIsSaved(true);
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
        setIsSaved(true);  // Mark as saved
        setResetTrackSaved(true);
        setTimeout(() => setResetTrackSaved(false), 100);  // Reset timeout
        delete playlistStateCache[playlistData.playlistId];  // Clear cache after discard
        clearPlaylistCache(playlistData.playlistId);  // Ensure cache is refreshed after discard
    };

    // Detect if there are unsaved changes independently
    const hasChanges = JSON.stringify(localTracks) !== JSON.stringify(playlistTracksArr);

    // Update saved state for buttons and icon after initialization
    useEffect(() => {
        if (isInitialized) {
            setIsSaved(!hasChanges);  // Update save state after initialization
        }
    }, [hasChanges, isInitialized]);

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
                            src={isSaved ? IMG.savedPNG : IMG.unsavedPNG}  // Update the icon based on save state
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
                            <div id="col-saved" className="col-1 d-flex justify-content-start align-items-end"></div>
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



/* import React, { useState, useEffect } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo";
import PlaylistTrack from "./track/PlaylistTrack";
import usePlaylistActions from "../../../../../hooks/user_hooks/usePlaylistActions";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Cache for OpenPlaylist modifications
const openPlaylistCache = {};

function OpenPlaylist({ playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { playlistTracksArr, setPlaylistTracksArr, handleTrackChange, clearPlaylistCache } = usePlaylistInfo({ playlistData, accessToken });
    const { setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist, reorderTracksInPlaylist, newEditedName } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });
    
    const [localTracks, setLocalTracks] = useState([]);  // Local state for changes
    const [isSaved, setIsSaved] = useState(true);  // State to track whether the playlist is saved or unsaved
    const [resetTrackSaved, setResetTrackSaved] = useState(false);  // Reset state for individual track saved status
    const [isInitialized, setIsInitialized] = useState(false); // Flag to prevent flashing

    // Initialize localTracks with cached tracks or original data
    useEffect(() => {
        // Ensure we only update the state after confirming the cache or the API data
        if (openPlaylistCache[playlistData.playlistId]) {
            setLocalTracks(openPlaylistCache[playlistData.playlistId]);  // Load cached changes
            setIsSaved(true);  // Ensure the saved state is correct after re-entry
        } else {
            setLocalTracks(playlistTracksArr);  // Load original playlist data from API
            setIsSaved(true);  // Mark as saved initially since it's the fetched data
        }
        setIsInitialized(true);  // Ensure the component doesn't flash or show wrong states initially
    }, [playlistData.playlistId, playlistTracksArr]);

    // Function to handle drag end and update track order locally
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = localTracks.findIndex((track) => track.trackUri === active.id);
            const newIndex = localTracks.findIndex((track) => track.trackUri === over.id);
            const reorderedTracks = arrayMove(localTracks, oldIndex, newIndex);
            setLocalTracks(reorderedTracks);  // Update local track order
            setIsSaved(false);  // Mark as unsaved when changes are made
            handleTrackChange();  // Clear cache when track order is changed
            openPlaylistCache[playlistData.playlistId] = reorderedTracks;  // Cache unsaved changes
        }
    };

    // Function to handle saving changes to Spotify
    const handleSaveChanges = async () => {
        const uris = localTracks.map(track => track.trackUri);  // Get URIs from local state
        try {
            await reorderTracksInPlaylist(playlistData.playlistId, uris);  // Save changes via Spotify API
            
            // Update fetched state with saved state
            setPlaylistTracksArr(localTracks);

            // Update the cache with the newly saved version
            openPlaylistCache[playlistData.playlistId] = localTracks;

            // Mark playlist as saved and refresh cache
            setIsSaved(true);
            clearPlaylistCache(playlistData.playlistId);  // Clear and refresh cache after saving
            setResetTrackSaved(true);
            setTimeout(() => setResetTrackSaved(false), 100);  // Timeout for reset
        } catch (error) {
            console.error("Error saving reordered tracks:", error);
        }
    };

    // Function to discard local changes and reset to last fetched data
    const handleDiscardChanges = () => {
        setLocalTracks(playlistTracksArr);  // Reset to original data
        setIsSaved(true);  // Mark as saved
        setResetTrackSaved(true);
        setTimeout(() => setResetTrackSaved(false), 100);  // Reset timeout
        delete openPlaylistCache[playlistData.playlistId];  // Clear cache after discard
        clearPlaylistCache(playlistData.playlistId);  // Ensure the cache is refreshed properly after discard
    };

    // Detect if there are unsaved changes
    const hasChanges = JSON.stringify(localTracks) !== JSON.stringify(playlistTracksArr);

    // Synchronize the buttons and the saved icon
    useEffect(() => {
        if (isInitialized) {  // Only update the save state after initialization to prevent flashing
            setIsSaved(!hasChanges);  // Synchronize save state based on changes
        }
    }, [hasChanges, isInitialized]);

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
                            src={isSaved ? IMG.savedPNG : IMG.unsavedPNG}  // Update the icon based on save state
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
                            <div id="col-saved" className="col-1 d-flex justify-content-start align-items-end"></div>
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

export default OpenPlaylist; */