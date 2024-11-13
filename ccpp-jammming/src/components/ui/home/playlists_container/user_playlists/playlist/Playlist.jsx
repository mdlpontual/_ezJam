import React, { useEffect } from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../hooks/TrackContext"; 
import usePlaylistInfo from "../../../../../../hooks/user_hooks/usePlaylistInfo";
import usePlaylistActions from "../../../../../../hooks/user_hooks/usePlaylistActions";
import Equalizer from '../../../../../../utils/Equalizer';
import { useSave } from "../../../../../../hooks/user_hooks/SaveContext"; // Import the Save context

function Playlist({ playlistData, onPlaylistClick, 
                    onBackClick, onPlayButton, onArtistClick, 
                    onAlbumClick, playTrack, pauseTrack, 
                    refetchPlaylists, editPlaylists, 
                    setUserPlaylistsArr, accessToken }) {

    const { currentQueueUri, isPaused } = useTrack(); 
    const { playlistTracksArr } = usePlaylistInfo({ playlistData, accessToken });    
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });

    const uriQueue = playlistTracksArr.map(track => track.trackUri);

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

    return (
        <div id="single-pl-container" className="container-fluid" >
            <div id="single-pl-row" className="row">
                <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                    <img id="playlist-cover" src={cover} alt="saved icon" width="65px" />
                </div>
                <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                    <h3 id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                        {playlistData.playlistTitle}
                    </h3>
                </div>
                <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <div id="edit-pl-button" type="button" className="justify-content-center align-items-center" onClick={handleEditPlaylist}>
                        <img src={IMG.pencilPNG} alt="edit icon" width="25px" />
                    </div>
                </div>
                <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <a id="share-pl-button" type="button" onClick={handleSharePlaylist}>
                        <img src={IMG.sharePNG} alt="share icon" width="25px" />
                    </a>
                </div>
                <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <a id="delete-pl-button" type="button" onClick={handleUnfollowPlaylist}>
                        <img src={IMG.trashBinPNG} alt="delete icon" width="25px" />
                    </a>
                </div>
                <div id="col-saved" className="col-auto d-flex justify-content-center align-items-center">
                    <img 
                        id="saved-icon" 
                        src={isSaved ? IMG.savedPNG : IMG.cautionPNG}  // Sync saved state from global state
                        height="30px" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Playlist;