import React, { useState, useEffect } from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../hooks/TrackContext"; 
import useReducePlaylistInfo from "../../../../../../hooks/user_hooks/useReducePlaylistInfo";

function Playlist({ playlistData, onPlaylistClick, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { isPaused } = useTrack(); 
    const { reducedPlaylistTracksArr } = useReducePlaylistInfo({ playlistData, accessToken });

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

    const isTrackPlaying = false;

    if (!isTrackPlaying) {
        return (
            <div id="single-pl-container" className="container-fluid">
                <div id="single-pl-row" className="row">
                    <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                        <img id="playlist-cover" src={cover} alt="saved icon" width="60px" />
                        <a id="play-button" type="button" onClick={() => onPlayButton(firstUriTrack, reducedUriQueue)}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="22px" />
                        </a>
                    </div>
                    <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                            <h4 className="d-flex align-items-center">{playlistData.playlistTitle}</h4>
                        </a>
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.pencilPNG} alt="edit icon" width="27px" />
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.sharePNG} alt="share icon" width="27px" />
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
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
                        <img id="play-icon" src={isPaused ? IMG.playPNG2Green : IMG.pausePNG2Green} alt="play/pause icon" width="22px" />
                    </a>
                </div>
                <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                    <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                        <h4 className="d-flex align-items-center">{playlistData.playlistTitle}</h4>
                    </a>
                </div>
                <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <img src={IMG.pencilPNG} alt="edit icon" width="27px" />
                </div>
                <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <img src={IMG.sharePNG} alt="share icon" width="27px" />
                </div>
                <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                    <img src={IMG.trashBinPNG} alt="delete icon" width="27px" />
                </div>
            </div>
        </div>
    );
}

export default Playlist;


/* import React, { useState, useEffect } from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import useReducePlaylistInfo from "../../../../../../hooks/user_hooks/usePlaylistInfo";
import { useTrack } from "../../../../../../hooks/TrackContext"; 

function Playlist({ playlistData, onPlaylistClick, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { isPaused } = useTrack(); 
    const { reducedPlaylistTracksArr } = useReducePlaylistInfo({ playlistData, accessToken });

    let reducedUriQueue = [];
    reducedPlaylistTracksArr.forEach(track => reducedUriQueue.push(track.trackUri));
    let firstUriTrack = reducedUriQueue[0];

    let cover;
    if (playlistData.playlistCover) {
        cover = playlistData.playlistCover;
    } else {
        cover = IMG.placeHolders;
    }

    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    //---------------------------------------------------------------------------------------------------------------------------------------------------

    let isTrackPlaying = false;

    //---------------------------------------------------------------------------------------------------------------------------------------------------

    if(!isTrackPlaying) {
        return (
            <>
                <div id="single-pl-container" className="container-fluid">
                    <div id="single-pl-row" className="row">
                        <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                            <img id="playlist-cover" src={cover} alt="saved icon" width="60px"/>
                            <a id="play-button" type="button" onClick={() => onPlayButton(firstUriTrack, reducedUriQueue)}>
                                <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="22px"/>
                            </a>
                        </div>
                        <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                            <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                                <h4 className="d-flex align-items-center">{playlistData.playlistTitle}</h4>
                            </a>
                        </div>
                        <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                            <img src={IMG.pencilPNG} alt="saved icon" width="27px"/>
                        </div>
                        <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                            <img src={IMG.sharePNG} alt="saved icon" width="27px"/>
                        </div>
                        <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                            <img src={IMG.trashBinPNG} alt="saved icon" width="27px"/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div id="single-pl-container-green" className="container-fluid">
                <div id="single-pl-row" className="row">
                    <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                        <img id="playlist-cover" src={cover} alt="saved icon" width="60px"/>
                        <a id="play-button" type="button" onClick={() => onPlayButton(handleTogglePlay)}>
                            <img id="play-icon" src={isPaused ? IMG.playPNG2Green : IMG.pausePNG2Green} alt="play icon" width="22px"/>
                        </a>
                    </div>
                    <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <a id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                            <h4 className="d-flex align-items-center">{playlistData.playlistTitle}</h4>
                        </a>
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.pencilPNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.sharePNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.trashBinPNG} alt="saved icon" width="27px"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Playlist; */