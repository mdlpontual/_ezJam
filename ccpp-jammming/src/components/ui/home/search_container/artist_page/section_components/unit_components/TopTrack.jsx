import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../../hooks/TrackContext";
import { useAddTrack } from "../../../../../../../hooks/user_hooks/AddTrackContext";
import Equalizer from "../../../../../../../utils/Equalizer"
import useUserInfo from "../../../../../../../hooks/user_hooks/useUserInfo";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function TopTrack({ topTrack, order, onPlayButton, playTrack, pauseTrack, fetchedArtistTopTracksArray, accessToken }) {
    const { currentTrackUri, isPaused } = useTrack(); 
    const { updateTrackToAdd, trackToAdd } = useAddTrack();
    const { userPlaylistsArr } = useUserInfo({accessToken});

    const uriTrack = topTrack.trackUri;
    const idTrack = topTrack.trackId;
    let uriQueue = [];
    fetchedArtistTopTracksArray.map(track => uriQueue.push(track.trackUri));

    let cover;
    if (topTrack.trackCover) {
        cover = topTrack.trackCover;
    } else {
        cover = IMG.placeHolders;
    }
    
    // Handle play/pause toggle
    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    if(currentTrackUri !== uriTrack) {
        return (
            <>
                <div id="songs-inner-row" className="row">
                    <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{order + 1}</p>
                        <a id="play-button" type="button" onClick={() => onPlayButton(uriTrack, uriQueue)}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="20px"/>
                        </a>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <img src={cover} height="40px"/>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{topTrack.trackTitle}</h5>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(topTrack.trackDuration)}</p>
                    </div>
                    <div id="col-plus" className="dropdown col-1 d-flex justify-content-end align-items-center">
                        <div className="dropdown">
                            <button id="plus-dd" className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                            </button>
                            <ul id="dropdown-ul" className="dropdown-menu">
                                <li><h5 id="dd-top-text" className="dropdown-item">Select a playlist to add this track:</h5></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                {userPlaylistsArr.map((playlist) => (
                                    <li key={playlist.playlistId}>
                                        <a id="dd-item" className="dropdown-item" type="button" onClick={() => {updateTrackToAdd(uriTrack, idTrack, playlist, accessToken), trackToAdd}}>
                                            {playlist.playlistTitle}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div> 
            </>
        );
    }
    return (
        <>
            <div id="songs-inner-row-green" className="row">
                <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                    <a className="col-1 d-flex justify-content-center align-items-center" id="play-button" type="button" onClick={() => onPlayButton(handleTogglePlay)}>
                        <div className="d-flex justify-content-center align-items-center" id="play-icon">
                            {isPaused ? <img src={IMG.playPNG2Green} alt="play icon" width="22px" /> : <Equalizer />}
                        </div>
                    </a>
                </div>
                <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={cover} height="40px"/>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{topTrack.trackTitle}</h5>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(topTrack.trackDuration)}</p>
                </div>
                <div id="col-plus" className="dropdown col-1 d-flex justify-content-end align-items-center">
                    <div className="dropdown">
                        <button id="plus-dd" className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                        </button>
                        <ul id="dropdown-ul" className="dropdown-menu">
                            <li><h5 id="dd-top-text" className="dropdown-item">Select a playlist to add this track:</h5></li>
                            <li><hr className="dropdown-divider"></hr></li>
                            {userPlaylistsArr.map((playlist) => (
                                <li key={playlist.playlistId}>
                                    <a id="dd-item" className="dropdown-item" type="button"onClick={() => {updateTrackToAdd(uriTrack, idTrack, playlist, accessToken), trackToAdd}}>
                                        {playlist.playlistTitle}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>                
            </div> 
        </>
    );
}

export default TopTrack;