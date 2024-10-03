import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../hooks/TrackContext"; 
import useReducePlaylistInfo from "../../../../../../hooks/user_hooks/useReducePlaylistInfo";
import usePlaylistActions from "../../../../../../hooks/user_hooks/usePlaylistActions";

function Playlist({ playlistData, onPlaylistClick, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, setUserPlaylistsArr, accessToken }) {
    const { currentQueueUri, isPaused } = useTrack(); 
    const { reducedPlaylistTracksArr } = useReducePlaylistInfo({ playlistData, accessToken });
    const { editPlaylistName } = usePlaylistActions({ accessToken });

    console.log(reducedPlaylistTracksArr)

    const reducedUriQueue = reducedPlaylistTracksArr.map(track => track.trackUri);
    const firstUriTrack = reducedUriQueue[0];

    const cover = playlistData.playlistCover || IMG.placeHolders;

    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    const handleEditPlaylist = async () => {
        const newPlaylistName = prompt("Enter the new playlist name:", playlistData.playlistTitle);
        if (newPlaylistName && newPlaylistName.trim() !== "") {
            try {
                // Call the API to update the playlist name
                await editPlaylistName(playlistData.playlistId, newPlaylistName);

                // Immediately update the playlist name locally in userPlaylistsArr
                setUserPlaylistsArr((prevPlaylists) =>
                    prevPlaylists.map((playlist) =>
                        playlist.playlistId === playlistData.playlistId
                            ? { ...playlist, playlistTitle: newPlaylistName }
                            : playlist
                    )
                );

            } catch (error) {
                console.error("Error updating playlist or re-fetching:", error);
            }
        }
    };

    // Function to handle sharing the playlist URL
    const handleSharePlaylist = () => {
        const playlistUrl = `https://open.spotify.com/playlist/${playlistData.playlistId}`;
        navigator.clipboard.writeText(playlistUrl)
            .then(() => {
                alert(`Playlist URL copied to clipboard: ${playlistUrl}`);
            })
            .catch((error) => {
                console.error("Error copying playlist URL:", error);
            });
    };

    //---------------------------------------------------------------------------------------------------------------------------------------------------

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
    if (Array.isArray(reducedUriQueue) &&
        Array.isArray(currentQueueUri) &&
        reducedUriQueue.length === currentQueueUri.length &&
        arraysAreEqual(reducedUriQueue, currentQueueUri)) {
            isTrackPlaying = true;
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------

    if (reducedPlaylistTracksArr.length === 0) {
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
                        <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                            <h4 className="d-flex align-items-center">{playlistData.playlistTitle}</h4>
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
                        <a id="delete-pl-button" type="button">
                            <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                        </a>
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
                        <a id="play-button" type="button" onClick={() => onPlayButton(firstUriTrack, reducedUriQueue)}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="30px" />
                        </a>
                    </div>
                    <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                            <h4 className="d-flex align-items-center">{playlistData.playlistTitle}</h4>
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
                        <a id="delete-pl-button" type="button">
                            <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                        </a>
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
                    <a id="play-button" type="button" onClick={handleTogglePlay}>
                        <img id="play-icon" src={isPaused ? IMG.playPNG2Green : IMG.pausePNG2Green} alt="play/pause icon" width="30px" />
                    </a>
                </div>
                <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                    <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                        <h4 className="d-flex align-items-center">{playlistData.playlistTitle}</h4>
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
                    <a id="delete-pl-button" type="button">
                        <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Playlist;