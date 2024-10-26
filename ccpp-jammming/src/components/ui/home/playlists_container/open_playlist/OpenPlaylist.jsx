import React, { useState, useEffect } from "react";
import { useSave } from "../../../../../hooks/user_hooks/SaveContext"; // Import the Save context
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo";
import PlaylistTrack from "./track/PlaylistTrack";
import usePlaylistActions from "../../../../../hooks/user_hooks/usePlaylistActions";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAddTrack } from "../../../../../hooks/user_hooks/AddTrackContext";
import EmptyPlaylistPage from "./track/EmptyPlaylistPage";

const playlistStateCache = {};

// Component
function OpenPlaylist({ playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, updateQueue, accessToken }) {
    const { playlistTracksArr, setPlaylistTracksArr, handleTrackChange, clearPlaylistCache } = usePlaylistInfo({ playlistData, accessToken });
    const { setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist, reorderTracksInPlaylist, newEditedName } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });
    const { updateTrackToAdd, playlistToAddTrack, trackToAddContent, setPlaylistToAddTrack, setTrackToAddContent } = useAddTrack();

    // Separate local states for tracks, reset state, and initialization flag
    const [localTracks, setLocalTracks] = useState([]);
    const [resetTrackSaved, setResetTrackSaved] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);  // State to store timeout ID
    const [loading, setLoading] = useState(true);

    // Import the save context functions for this playlist
    const { getIsSaved, setIsSaved } = useSave();
    const isSaved = getIsSaved(playlistData.playlistId); // Get saved state for the specific playlist

    let openUriQueue = [];
    localTracks.forEach(track => openUriQueue.push(track.trackUri));

    useEffect(() => {
        if (!isSaved) {
            updateQueue(openUriQueue);
        }
    }, [isSaved, localTracks]);

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
            
            // Reset "track saved" state
            setResetTrackSaved(true);
            setTimeout(() => setResetTrackSaved(false), 100);  // Slight delay for state synchronization
        } catch (error) {
            console.error("Error saving reordered tracks:", error);
        }
    };

    const handleDiscardChanges = () => {
        // Clear cache and reset localTracks to the original playlist state
        clearPlaylistCache(playlistData.playlistId);
    
        // Reset localTracks to the original tracks from the API (spread to create new array reference)
        setLocalTracks([...playlistTracksArr]);
    
        // Reset playlistStateCache to the original playlist
        playlistStateCache[playlistData.playlistId] = {
            tracks: [...playlistTracksArr],
            isSaved: true,
        };
    
        // Update state to mark playlist as saved
        debounceStateUpdate(() => setIsSaved(playlistData.playlistId, true), 300);
    
        // Reset "track saved" state
        setResetTrackSaved(true);
        setTimeout(() => setResetTrackSaved(false), 100);  // Slight delay for state synchronization
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

    useEffect(() => {
        // Set a timeout of 5 seconds for waiting until localTracks or playlistTracksArr are populated
        const timeoutDuration = 500; 
        let timeoutId = null;
    
        const checkAndProceed = () => {
            // Check if either localTracks or playlistTracksArr is empty, null, or undefined
            if (
                !Array.isArray(localTracks) || localTracks.length === 0 ||
                !Array.isArray(playlistTracksArr) || playlistTracksArr.length === 0
            ) {
                // Wait for a limited time, then proceed after the timeout
                timeoutId = setTimeout(() => {
                    proceedToAddTrack();  // Proceed after timeout
                }, timeoutDuration);
                return;  // Exit early and wait for the timeout
            }
    
            // If localTracks and playlistTracksArr are already populated, proceed immediately
            proceedToAddTrack();
        };
    
        // Function to proceed with adding the track
        const proceedToAddTrack = () => {
            // Check if trackToAddContent has a valid trackUri before proceeding
            if (playlistToAddTrack.playlistTitle === playlistData.playlistTitle) {
                setLocalTracks((prevTracks) => {
                    const trackExists = trackToAddContent.some(trackToAdd => prevTracks.some(prevTrack => prevTrack.trackUri === trackToAdd.trackUri));
                    if (trackExists) {
                        return prevTracks;  // Prevent adding duplicates
                    }
    
                    // Create a new array (deep copy) and add the new track
                    const updatedAddedTracks = prevTracks.concat(trackToAddContent);
    
                    // Immediately compare and update hasChanges
                    const hasChangesNow = JSON.stringify(updatedAddedTracks) !== JSON.stringify(playlistTracksArr);
    
                    // Update isSaved and hasChanges immediately
                    setIsSaved(playlistData.playlistId, !hasChangesNow);
    
                    // Update the playlistStateCache to reflect the added tracks
                    playlistStateCache[playlistData.playlistId] = {
                        tracks: updatedAddedTracks,
                        isSaved: false,
                    };
    
                    return updatedAddedTracks;  // Return the new array
                });
    
                // Clear and update the cache after adding the track
                handleTrackChange();
    
                setPlaylistToAddTrack({});
                setTrackToAddContent({});
            }
        };
    
        // Run the check on mount or when trackToAddContent changes
        checkAndProceed();
    
        // Clean up the timeout on unmount
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [trackToAddContent]);
    

    // Update saved state for buttons and icon after initialization
    useEffect(() => {
        if (isInitialized) {
            debounceStateUpdate(() => setIsSaved(playlistData.playlistId, isSaved), 300);  // Debounce setting state to prevent rapid updates
        }
    }, [isSaved, isInitialized, playlistData.playlistId, setIsSaved, trackToAddContent]);

    useEffect(() => {
        let timeoutDuration = 700; // Default timeout duration (1 second)

        // Check if there is cached data for the current playlist
        if (playlistStateCache[playlistData.playlistId]) {
            timeoutDuration = 200; // Use a shorter timeout if the cache exists (300ms)
        }
    
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after the timeout
        }, timeoutDuration);
    
        return () => clearTimeout(timer); // Clear the timeout when the component unmounts
    }, [playlistData.playlistId]);
    

    //------------------------------------------------------------------------------------------------------------
    
    // Handle drag over event to allow drop
    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow dropping
    };

    // Handle drop event when track is dropped onto a playlist
    const handleDrop = (event, playlistData) => {
        event.preventDefault();
        const uriTrack = event.dataTransfer.getData('trackUri');
        const idTrack = event.dataTransfer.getData('trackId');
        const accessToken = event.dataTransfer.getData('accessToken');

        const playlist = playlistData;

        // Call updateTrackToAdd with dropped track and selected playlist
        updateTrackToAdd(uriTrack, idTrack, playlist, accessToken);
    };

    return (
        <>
            <div id="open-pl-container" className="container-fluid d-flex flex-column" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, playlistData)}>
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
                            {loading ? (
                                    <div className="d-flex justify-content-center align-items-center">Loading...</div> // Placeholder content during the timeout
                                ) : (                        
                                <div id="tracks-list-col" className="col">
                                    {localTracks.length === 0 ? (
                                        <EmptyPlaylistPage/>
                                    ) : (
                                        // Render the track list if there are tracks
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
                                                        resetTrackSaved={resetTrackSaved}
                                                    />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    )}
                                </div> 
                            )}
                        </div>
                    </div>
                </main>
                <footer id="open-pl-footer" className="row">
                    <div className="col-1 d-flex flex-column justify-content-center align-items-center"></div>
                    <div id="save-button-col" className="col-5 d-flex flex-column justify-content-center align-items-center">
                        <button id="save-button" className={`btn btn-lg ${!isSaved ? 'btn-primary' : 'btn-outline-light'}`} onClick={handleSaveChanges} disabled={isSaved}>
                            Save to Spotify
                        </button>
                    </div>
                    <div id="discard-button-col" className="col-5 d-flex flex-column justify-content-center align-items-center">
                        <button id="discard-button" className={`btn btn-lg ${!isSaved ? 'btn-danger' : 'btn-outline-light'}`} onClick={handleDiscardChanges} disabled={isSaved}>
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