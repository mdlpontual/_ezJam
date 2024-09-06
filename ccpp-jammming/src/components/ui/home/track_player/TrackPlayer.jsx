import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";

function TrackPlayer({ isPaused, isActive, currentTrack, playTrack, pauseTrack }) {
    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    if (!isActive) {
        return (
            <div id="track-player-container" className="container-fluid d-flex justify-content-center align-items-center">
                <div id="track-player-row" className="row d-flex justify-content-center align-items-center">
                    <b> Track Player instance not active. Transfer your playback using your Spotify app </b>
                </div>
            </div>
        );
    } else {
        return (
            <div id="track-player-container" className="container-fluid">
                <div id="track-player-row" className="row">
                    <div id="col-track" className="col d-flex">
                        <TrackDisplay currentTrack={currentTrack} />
                    </div>
                    <div id="col-player" className="col d-flex flex-column">

                        <div id="track-butttons-row" className="row d-flex">
                            <div id="col-shuffle" className="col d-flex justify-content-end align-items-center">
                                <img src={IMG.noshufflePNG} alt="shuffle button" height="20px" />
                            </div>
                            <div id="col-prev" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.previousPNG} alt="previous track button" height="20px" />
                            </div>
                            <div id="col-play" className="col-auto d-flex justify-content-center align-items-center">
                                <a id="togglePlay-button" type="button" onClick={handleTogglePlay} >
                                    <img src={isPaused ? IMG.playPNG : IMG.pausePNG} alt="play pause button" height="35px"/>
                                </a>
                            </div>
                            <div id="col-next" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.nextPNG} alt="next track button" height="20px" />
                            </div>
                            <div id="col-repeat" className="col d-flex justify-content-start align-items-center">
                                <img src={IMG.norepeatPNG} alt="repeat button" height="20px" />
                            </div>
                        </div>

                        <div id="progress-bar-row" className="row d-flex">
                            <div id="col-left-time" className="col-1 d-flex justify-content-center align-items-center">
                                <p>00:00</p>
                            </div>
                            <div id="col-bar" className="col d-flex justify-content-center align-items-center">
                                <input id="progress-bar" type="range" />
                            </div>
                            <div id="col-right-time" className="col-1 d-flex justify-content-center align-items-center">
                                <p>00:00</p>
                            </div>
                        </div>
                    </div>
                    <div id="col-volume" className="col">
                        <TrackVolume />
                    </div>
                </div>
            </div>
        );
    }
}

export default TrackPlayer;


/* import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";

function TrackPlayer({ uriTrack, isPaused, isActive, currentTrack, playTrack, pauseTrack }) {
    // Function to toggle play/pause
    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack();
        } else {
            pauseTrack();
        }
    };

    if (!isActive) { 
        return (
            <div id="track-player-container" className="container-fluid d-flex justify-content-center align-items-center">
                <div id="track-player-row" className="row d-flex justify-content-center align-items-center">
                    <b> Track Player instance not active. Transfer your playback using your Spotify app </b>
                </div>
            </div>
        );
    } else {
        return (
            <div id="track-player-container" className="container-fluid">
                <div id="track-player-row" className="row">
                    <div id="col-track" className="col d-flex">
                        <TrackDisplay currentTrack={currentTrack} />
                    </div>
                    <div id="col-player" className="col d-flex flex-column">
                        <div id="track-butttons-row" className="row d-flex">
                            <div id="col-shuffle" className="col d-flex justify-content-end align-items-center">
                                <img src={IMG.noshufflePNG} alt="shuffle button" height="20px" />
                            </div>
                            <div id="col-prev" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.previousPNG} alt="previous track button" height="20px" />
                            </div>
                            <div id="col-play" className="col-auto d-flex justify-content-center align-items-center">
                                <a id="togglePlay-button" type="button" onClick={handleTogglePlay}>
                                    <img src={isPaused ? IMG.playPNG : IMG.pausePNG} alt="play pause button" height="35px" />
                                </a>
                            </div>
                            <div id="col-next" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.nextPNG} alt="next track button" height="20px" />
                            </div>
                            <div id="col-repeat" className="col d-flex justify-content-start align-items-center">
                                <img src={IMG.norepeatPNG} alt="repeat button" height="20px" />
                            </div>
                        </div>

                        <div id="progress-bar-row" className="row d-flex">
                            <div id="col-left-time" className="col-1 d-flex justify-content-center align-items-center">
                                <p>00:00</p>
                            </div>
                            <div id="col-bar" className="col d-flex justify-content-center align-items-center">
                                <input id="progress-bar" type="range" />
                            </div>
                            <div id="col-right-time" className="col-1 d-flex justify-content-center align-items-center">
                                <p>00:00</p>
                            </div>
                        </div>
                    </div>
                    <div id="col-volume" className="col">
                        <TrackVolume />
                    </div>
                </div>
            </div>
        );
    }
}

export default TrackPlayer; */


/* import React, { useState, useEffect } from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";

function TrackPlayer({ uriTrack, isPaused, isActive, player, currentTrack, accessToken }) {
    if (!isActive) { 
        return (
            <>
                <div id="track-player-container" className="container-fluid d-flex justify-content-center align-items-center">
                    <div id="track-player-row" className="row d-flex justify-content-center align-items-center">
                        <b> Track Player instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div id="track-player-container" className="container-fluid">
                    <div id="track-player-row" className="row">
                        <div id="col-track" className="col d-flex">
                            <TrackDisplay />
                        </div>
                        <div id="col-player" className="col d-flex flex-column">
                            <div id="track-butttons-row" className="row d-flex">
                                <div id="col-shuffle" className="col d-flex justify-content-end align-items-center">
                                    <img src={IMG.noshufflePNG} alt="shuffle button" height="20px" />
                                </div>
                                <div id="col-prev" className="col-auto d-flex justify-content-center align-items-center">
                                    <img src={IMG.previousPNG} alt="previous track button" height="20px" />
                                </div>
                                <div id="col-play" className="col-auto d-flex justify-content-center align-items-center">
                                    <img
                                        src={isActive ? IMG.pausePNG : IMG.playPNG}
                                        alt="play pause button"
                                        height="35px"
                                        onClick={() => { player.togglePlay() }}
                                    />
                                </div>
                                <div id="col-next" className="col-auto d-flex justify-content-center align-items-center">
                                    <img src={IMG.nextPNG} alt="next track button" height="20px" />
                                </div>
                                <div id="col-repeat" className="col d-flex justify-content-start align-items-center">
                                    <img src={IMG.norepeatPNG} alt="repeat button" height="20px" />
                                </div>
                            </div>

                            <div id="progress-bar-row" className="row d-flex">
                                <div id="col-left-time" className="col-1 d-flex justify-content-center align-items-center">
                                    <p>00:00</p>
                                </div>
                                <div id="col-bar" className="col d-flex justify-content-center align-items-center">
                                    <input id="progress-bar" type="range" />
                                </div>
                                <div id="col-right-time" className="col-1 d-flex justify-content-center align-items-center">
                                    <p>00:00</p>
                                </div>
                            </div>
                        </div>
                        <div id="col-volume" className="col">
                            <TrackVolume />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default TrackPlayer; */

/*
import { useState, useEffect } from "react";
import axios from "axios";

function usePlayerDataPost({ availableDevices, accessToken, uriTrack }) {
    const [isPlaying, setIsPlaying] = useState(false);
    
    const idDevice = availableDevices.length > 0 ? availableDevices[0].deviceId : null;

    const startPlayback = async () => {
        if (!idDevice || !uriTrack || !accessToken) return;
        try {
            await axios.put(https://api.spotify.com/v1/me/player/play?device_id=${idDevice},
                { uris: [uriTrack] },
                { headers: { Authorization: Bearer ${accessToken} } }
            );
            setIsPlaying(true);
        } catch (error) {
            console.error("Error starting playback:", error);
        }
    };

    const pausePlayback = async () => {
        if (!idDevice || !accessToken) return;
        try {
            await axios.put(https://api.spotify.com/v1/me/player/pause?device_id=${idDevice}, 
                {},
                { headers: { Authorization: Bearer ${accessToken} } }
            );
            setIsPlaying(false);
        } catch (error) {
            console.error("Error pausing playback:", error);
        }
    };

    return { startPlayback, pausePlayback, isPlaying };
}

export default usePlayerDataPost;


*/