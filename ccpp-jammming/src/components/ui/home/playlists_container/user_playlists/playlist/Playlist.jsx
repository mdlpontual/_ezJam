import React, { useEffect } from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../hooks/TrackContext"; 
import usePlaylistInfo from "../../../../../../hooks/user_hooks/usePlaylistInfo";
import usePlaylistActions from "../../../../../../hooks/user_hooks/usePlaylistActions";
import Equalizer from '../../../../../../utils/Equalizer';
import { useSave } from "../../../../../../hooks/user_hooks/SaveContext"; // Import the Save context

function Playlist({ playlistData, onPlaylistClick, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, refetchPlaylists, editPlaylists, setUserPlaylistsArr, accessToken }) {
    const { currentQueueUri, isPaused } = useTrack(); 
    const { playlistTracksArr, playlistStateCache } = usePlaylistInfo({ playlistData, accessToken });    
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });

    console.log(playlistTracksArr)

    const uriQueue = playlistTracksArr.map(track => track.trackUri);

/*     useEffect(() => {
        uriQueue = playlistTracksArr.map(track => track.trackUri);
    }, []) */

    const firstUriTrack = uriQueue[0];

    const cover = playlistData.playlistCover || IMG.placeHolders;

    // Use the save context to get the save state for this specific playlist
    const { getIsSaved } = useSave();
    const isSaved = getIsSaved(playlistData.playlistId); // Get the saved state for this playlist

    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    function arraysAreEqual(arr1, arr2) {
        // First ensure both arrays have the same length
        if (arr1.length !== arr2.length) {
            return false;
        }
    
        // Helper function to compare partial arrays
        function partialArraysAreEqual(arr1, arr2, start, end) {
            for (let i = start; i < end; i++) {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            }
            return true;
        }
    
        const quarterLength = Math.floor(arr1.length / 4);
        const halfLength = Math.floor(arr1.length / 2);
    
        // Check the first quarter of the arrays
        if (!partialArraysAreEqual(arr1, arr2, 0, quarterLength)) {
            return false;
        }
    
        // Check the first half of the arrays
        if (!partialArraysAreEqual(arr1, arr2, 0, halfLength)) {
            return false;
        }
    
        // Check the full array (if quarter and half checks passed)
        return partialArraysAreEqual(arr1, arr2, 0, arr1.length);
    }
    
    let isTrackPlaying = false;
    
    // Check conditions step by step, short-circuiting on failure
    if (Array.isArray(uriQueue) &&
        Array.isArray(currentQueueUri) &&
        uriQueue.length === currentQueueUri.length &&
        arraysAreEqual(uriQueue, currentQueueUri)) {
            isTrackPlaying = true;
    }

    if (playlistTracksArr.length === 0) {
        return (
            <div id="single-pl-container" className="container-fluid">
                <div id="single-pl-row" className="row">
                    <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                        <img id="playlist-cover" src={cover} alt="saved icon" width="60px" />
                        <a id="play-button">
                            <img id="play-icon" src={cover} alt="play icon" width="60px" />
                        </a>
                    </div>
                    <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, onPlaylistClick, accessToken)}>
                            <h3 className="d-flex align-items-center">{playlistData.playlistTitle}</h3>
                        </a>
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="edit-pl-button" type="button" onClick={handleEditPlaylist}>
                            <img src={IMG.pencilPNG} alt="edit icon" width="27px" />
                        </a>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="share-pl-button" type="button" onClick={handleSharePlaylist}>
                            <img src={IMG.sharePNG} alt="share icon" width="27px" />
                        </a>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="delete-pl-button" type="button" onClick={handleUnfollowPlaylist}>
                            <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                        </a>
                    </div>
                    <div id="col-saved" className="col-auto d-flex justify-content-center align-items-center">
                        <img 
                            id="saved-icon" 
                            src={isSaved ? IMG.savedPNG : IMG.cautionPNG}  // Sync saved state from global state
                            height="35px" 
                        />
                    </div>
                </div>
            </div>
        );
    } 
    
    if (!isTrackPlaying) {
        return (
            <div id="single-pl-container" className="container-fluid">
                <div id="single-pl-row" className="row">
                    <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                        <img id="playlist-cover" src={cover} alt="saved icon" width="60px" />
                        <a id="play-button" type="button" onClick={() => onPlayButton(firstUriTrack, uriQueue)}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="30px" />
                        </a>
                    </div>
                    <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                            <h3 className="d-flex align-items-center">{playlistData.playlistTitle}</h3>
                        </a>
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="edit-pl-button" type="button" onClick={handleEditPlaylist}>
                            <img src={IMG.pencilPNG} alt="edit icon" width="27px" />
                        </a>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="share-pl-button" type="button" onClick={handleSharePlaylist}>
                            <img src={IMG.sharePNG} alt="share icon" width="27px" />
                        </a>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="delete-pl-button" type="button" onClick={handleUnfollowPlaylist}>
                            <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                        </a>
                    </div>
                    <div id="col-saved" className="col-auto d-flex justify-content-center align-items-center">
                        <img 
                            id="saved-icon" 
                            src={isSaved ? IMG.savedPNG : IMG.cautionPNG}  // Sync saved state from global state
                            height="35px" 
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="single-pl-container-green" className="container-fluid">
            <div id="single-pl-row" className="row">
                <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                    <img id="playlist-cover" src={cover} alt="saved icon" width="60px" />
                    <a className="d-flex justify-content-center align-items-center" id="play-button" type="button" onClick={handleTogglePlay}>
                        {isPaused ? <img id="play-icon" src={IMG.playPNG2Green} alt="play icon" width="30px"/> : <Equalizer />}
                    </a>
                </div>
                <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                    <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                        <h3 className="d-flex align-items-center">{playlistData.playlistTitle}</h3>
                    </a>
                </div>
                <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <a id="edit-pl-button" type="button" onClick={handleEditPlaylist}>
                        <img src={IMG.pencilPNG} alt="edit icon" width="27px" />
                    </a>
                </div>
                <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <a id="share-pl-button" type="button" onClick={handleSharePlaylist}>
                        <img src={IMG.sharePNG} alt="share icon" width="27px" />
                    </a>
                </div>
                <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <a id="delete-pl-button" type="button" onClick={handleUnfollowPlaylist}>
                        <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                    </a>
                </div>
                <div id="col-saved" className="col-auto d-flex justify-content-center align-items-center">
                    <img 
                        id="saved-icon" 
                        src={isSaved ? IMG.savedPNG : IMG.cautionPNG}  // Sync saved state from global state
                        height="35px" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Playlist;