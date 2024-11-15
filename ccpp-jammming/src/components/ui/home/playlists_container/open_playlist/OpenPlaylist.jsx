import React, { useState, useEffect } from "react";
import { useSave } from "../../../../../hooks/user_hooks/SaveContext";
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

function OpenPlaylist({ playlistData, onBackClick, 
                        onPlayButton, onArtistClick, 
                        onAlbumClick, playTrack, 
                        pauseTrack, updateQueue, accessToken }) {
    const { playlistTracksArr, setPlaylistTracksArr, handleTrackChange, clearPlaylistCache } = usePlaylistInfo({ playlistData, accessToken });
    const { userPlaylistsArr, setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const { updateTrackToAdd, playlistToAddTrack, trackToAddContent, setPlaylistToAddTrack, setTrackToAddContent } = useAddTrack();
    const { handleEditPlaylist, 
            handleSharePlaylist, 
            handleUnfollowPlaylist, 
            reorderTracksInPlaylist, 
            newEditedName } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });

    const [localTracks, setLocalTracks] = useState([]);
    const [resetTrackSaved, setResetTrackSaved] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
    const [isShiftSelecting, setIsShiftSelecting] = useState(false);

    const { getIsSaved, setIsSaved } = useSave();
    const isSaved = getIsSaved(playlistData.playlistId);
    
    let openUriQueue = [];
    localTracks.forEach(track => openUriQueue.push(track.trackUri));

    useEffect(() => {
        if (!isSaved) {
            updateQueue(openUriQueue);
        }
    }, [isSaved, localTracks]);

    useEffect(() => {
        if (playlistStateCache[playlistData.playlistId]) {
            setLocalTracks(playlistStateCache[playlistData.playlistId].tracks);
            setIsSaved(playlistData.playlistId, playlistStateCache[playlistData.playlistId].isSaved);
        } else {
            setLocalTracks(playlistTracksArr);
            setIsSaved(playlistData.playlistId, true);
        }
        
        setIsInitialized(true);
    }, [playlistData.playlistId, playlistTracksArr, setIsSaved]);

    const debounceStateUpdate = (callback, delay) => {
        if (timeoutId) clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(callback, delay);
        setTimeoutId(newTimeoutId);
    };

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return; // Exit if there’s no valid drop target
    
        const draggedTrackUri = active.id;
    
        // Determine if we're moving a group or a single track
        const tracksToMove = selectedTracks.includes(draggedTrackUri)
            ? selectedTracks // Move all selected tracks if the dragged item is selected
            : [draggedTrackUri]; // Otherwise, move only the dragged item
    
        const draggedIndices = tracksToMove.map(uri =>
            localTracks.findIndex(track => track.trackUri === uri)
        );
    
        const targetIndex = localTracks.findIndex(track => track.trackUri === over.id);
        const minIndex = Math.min(...draggedIndices);
        const maxIndex = Math.max(...draggedIndices);
    
        // Remove selected tracks from their original positions
        const remainingTracks = localTracks.filter(track => !tracksToMove.includes(track.trackUri));
    
        // Calculate the target insertion index after removing
        let insertionIndex;
        if (targetIndex < minIndex) {
            insertionIndex = targetIndex;
        } else if (targetIndex > maxIndex) {
            insertionIndex = targetIndex - (maxIndex - minIndex);
        } else {
            insertionIndex = minIndex; // No change if target within the selected range
        }
    
        // Insert the tracksToMove at the new position
        const reorderedTracks = [
            ...remainingTracks.slice(0, insertionIndex),
            ...localTracks.filter(track => tracksToMove.includes(track.trackUri)),
            ...remainingTracks.slice(insertionIndex)
        ];
    
        setLocalTracks(reorderedTracks);
        debounceStateUpdate(() => setIsSaved(playlistData.playlistId, false), 300); // Mark as unsaved
        handleTrackChange(); // Clear cache
        playlistStateCache[playlistData.playlistId] = { tracks: reorderedTracks, isSaved: false }; // Update cache
    };

    const handleSaveChanges = async () => {
        const uris = localTracks.map(track => track.trackUri);
        try {
            await reorderTracksInPlaylist(playlistData.playlistId, uris);
            setPlaylistTracksArr(localTracks);
            playlistStateCache[playlistData.playlistId] = { tracks: localTracks, isSaved: true };
            debounceStateUpdate(() => setIsSaved(playlistData.playlistId, true), 300);
            clearPlaylistCache(playlistData.playlistId);
            setResetTrackSaved(true);
            setTimeout(() => setResetTrackSaved(false), 100);
        } catch (error) {
            console.error("Error saving reordered tracks:", error);
        }
    };

    const handleDiscardChanges = () => {
        clearPlaylistCache(playlistData.playlistId);
        setLocalTracks([...playlistTracksArr]);
        playlistStateCache[playlistData.playlistId] = {
            tracks: [...playlistTracksArr],
            isSaved: true,
        };
        debounceStateUpdate(() => setIsSaved(playlistData.playlistId, true), 300);
        setResetTrackSaved(true);
        setTimeout(() => setResetTrackSaved(false), 100);
    };
    
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const preDeleteTrack = (uriTrack, selectedTracks) => {
        if (selectedTracks.length === 0) {
            const updatedTracks = localTracks.filter(track => track.trackUri !== uriTrack);
            setLocalTracks(updatedTracks);
            const hasChangesNow = JSON.stringify(updatedTracks) !== JSON.stringify(playlistTracksArr);
            setIsSaved(playlistData.playlistId, !hasChangesNow);
            playlistStateCache[playlistData.playlistId] = { tracks: updatedTracks, isSaved: !hasChangesNow };
        } else if (selectedTracks.length > 0) {
            const updatedTracks = localTracks.filter(track => !selectedTracks.some(selectedTrack => track.trackUri === selectedTrack));
            setLocalTracks(updatedTracks);
            const hasChangesNow = JSON.stringify(updatedTracks) !== JSON.stringify(playlistTracksArr);
            setIsSaved(playlistData.playlistId, !hasChangesNow);
            playlistStateCache[playlistData.playlistId] = { tracks: updatedTracks, isSaved: !hasChangesNow };
        }

        handleTrackChange();
        setSelectedTracks([]);
    };

    useEffect(() => {
        const timeoutDuration = 500;
        let timeoutId = null;

        const checkAndProceed = () => {
            if (!Array.isArray(localTracks) || localTracks.length === 0 ||
                !Array.isArray(playlistTracksArr) || playlistTracksArr.length === 0) {
                timeoutId = setTimeout(() => proceedToAddTrack(), timeoutDuration);
                return;
            }
            proceedToAddTrack();
        };

        const proceedToAddTrack = () => {
            if (playlistToAddTrack.playlistTitle === playlistData.playlistTitle) {
                setLocalTracks((prevTracks) => {
                    const trackExists = trackToAddContent.some(trackToAdd => 
                        prevTracks.some(prevTrack => prevTrack.trackUri === trackToAdd.trackUri)
                    );
                    if (trackExists) return prevTracks;

                    const updatedAddedTracks = prevTracks.concat(trackToAddContent);
                    playlistStateCache[playlistData.playlistId] = { tracks: updatedAddedTracks, isSaved: false };
                    return updatedAddedTracks;
                });

                debounceStateUpdate(() => setIsSaved(playlistData.playlistId, false), 300);
                handleTrackChange();
                setPlaylistToAddTrack({});
                setTrackToAddContent({});
            }
        };

        checkAndProceed();
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [trackToAddContent]);

    useEffect(() => {
        let timeoutDuration = playlistStateCache[playlistData.playlistId] ? 200 : 700;
        const timer = setTimeout(() => setLoading(false), timeoutDuration);
        return () => clearTimeout(timer);
    }, [playlistData.playlistId]);

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const handleTrackClick = (uriTrack, index, event) => {
        const isCtrlOrCmdPressed = event.metaKey || event.ctrlKey;
        const isShiftPressed = event.shiftKey;

        setSelectedTracks((prevSelected) => {
            if (isShiftPressed && lastSelectedIndex !== null) {
                const start = Math.min(lastSelectedIndex, index);
                const end = Math.max(lastSelectedIndex, index);
                const range = localTracks.slice(start, end + 1).map(track => track.trackUri);
                return Array.from(new Set([...prevSelected, ...range]));
            } else if (isCtrlOrCmdPressed) {
                return prevSelected.includes(uriTrack)
                    ? prevSelected.filter(track => track !== uriTrack)
                    : [...prevSelected, uriTrack];
            } else {
                setLastSelectedIndex(index);
                return prevSelected.includes(uriTrack) ? [] : [uriTrack];
            }
        });
    };

    const handleMouseDown = (event) => {
        if (event.shiftKey) setIsShiftSelecting(true);
    };

    const handleMouseUp = () => setIsShiftSelecting(false);

    const handleOutsideClick = (event) => {
        const container = document.getElementById("open-pl-container");
        if (!container.contains(event.target)) setSelectedTracks([]);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") setSelectedTracks([]);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const handleDragOver = (event) => event.preventDefault();

    const handleDrop = (event, playlistData) => {
        event.preventDefault();
        
        const uriTrack = event.dataTransfer.getData('trackUri');
        const idTrack = JSON.parse(event.dataTransfer.getData('trackIds')); // Parse JSON string back to array
        const accessToken = event.dataTransfer.getData('accessToken');
        
        updateTrackToAdd(uriTrack, idTrack, playlistData, accessToken);
    };

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div id="open-pl-container" 
                className={`container-fluid d-flex flex-column ${isShiftSelecting ? 'no-text-select' : ''}`}  
                onMouseDown={handleMouseDown} 
                onMouseUp={handleMouseUp}
                onDragOver={handleDragOver} 
                onDrop={(event) => handleDrop(event, playlistData)}
            >
                <header id="open-pl-header" className="row justify-content-center align-items-center">
                    <div title="Go to Previous Page" id="go-back-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="go-back" type="button" className="d-flex flex-column justify-content-center align-items-center" onClick={() => onBackClick()}>
                            <img id="back-white" src={IMG.gobackPNG} alt="go back button" width="22px"/>
                            <img id="back-green" src={IMG.gobackGreenPNG} alt="go back button" width="22px"/>
                        </a>
                    </div>
                    <div id="title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <h3 title={newEditedName}  className="align-items-center">{newEditedName}</h3>
                    </div>
                    <div id="checkmark-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img 
                            id="saved-icon" 
                            title={isSaved ? "This Playlist is Saved" : "This Playlist is not Saved"} 
                            src={isSaved ? IMG.savedPNG : IMG.unsavedPNG}
                            alt="saved icon" 
                            width="35px" 
                        />
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="edit-button" type="button" onClick={handleEditPlaylist}>
                            <img title="Edit this Playlist Name" src={IMG.pencilPNG} alt="edit icon" width="27px" />
                        </a>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="share-button" type="button" onClick={handleSharePlaylist}>
                            <img title="Share this Playlist" src={IMG.sharePNG} alt="share icon" width="27px" />
                        </a>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="delete-button" type="button" onClick={() => {
                            handleUnfollowPlaylist();
                            setTimeout(() => {
                                onBackClick();
                            }, 1000);
                        }}>
                            <img title="Delete this Playlist" src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                        </a>
                    </div>
                </header>
                <main id="open-pl-main" className="row flex-grow-1">
                    <div id="open-pl-col" className="col d-flex flex-column">
                        <div id="top-labels" className="row">
                            <div id="col-num" className="col-1 d-flex justify-content-center align-items-end">#</div>
                            <div id="col-blank" className="col-1 d-flex justify-content-start align-items-end"></div>
                            <div id="col-cover" className="col-1 d-flex justify-content-start align-items-end"></div>
                            <div id="col-title" className="col d-flex justify-content-start align-items-end">title</div>
                            <div id="col-album" className="col-2 d-flex justify-content-start align-items-end">album</div>
                            <div id="col-duration" className="col-1 d-flex justify-content-center align-items-end">
                                <img src={IMG.clockPNG} alt="clock icon" height="15px" />
                            </div>
                            <div id="col-minus" className="col-1 d-flex justify-content-start align-items-end"></div>
                        </div>
                        {loading ? (
                            <div id="tracks-list" className="row flex-grow-1">  
                                <div className="d-flex justify-content-center align-items-center">Loading...</div>
                            </div>
                        ) : localTracks.length === 0 ? (
                            <div id="tracks-list" className="row flex-grow-1">  
                                <EmptyPlaylistPage/>
                            </div>
                        ) : (
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
                                                    userPlaylistsArr={userPlaylistsArr}
                                                    accessToken={accessToken}
                                                    key={track.trackUri}
                                                    resetTrackSaved={resetTrackSaved}
                                                    onTrackClick={(event) => handleTrackClick(track.trackUri, i, event)}
                                                    isSelected={selectedTracks.includes(track.trackUri)}
                                                    selectedTracks={selectedTracks}
                                                />
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
                <footer id="open-pl-footer" className="row">
                    <div id="save-button-col" className="col-5 d-flex flex-column justify-content-center align-items-center">
                        <button title="Save this Playlist" id="save-button" className={`btn btn-lg ${!isSaved ? 'btn-primary' : 'btn-outline-light'}`} onClick={handleSaveChanges} disabled={isSaved}>
                            Save to Spotify
                        </button>
                    </div>
                    <div id="discard-button-col" className="col-5 d-flex flex-column justify-content-center align-items-center">
                        <button title="Discard All Changes" id="discard-button" className={`btn btn-lg ${!isSaved ? 'btn-danger' : 'btn-outline-light'}`} onClick={handleDiscardChanges} disabled={isSaved}>
                            Discard Changes
                        </button>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default OpenPlaylist;