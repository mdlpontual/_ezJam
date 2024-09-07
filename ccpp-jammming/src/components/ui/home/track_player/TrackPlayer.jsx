import React, { useState, useEffect, useRef } from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";

function TrackPlayer({ isPaused, isActive, currentTrack, trackPosition, playTrack, pauseTrack }) {
    const [liveTrackPosition, setLiveTrackPosition] = useState(trackPosition); // Local track position
    const intervalRef = useRef(null); // Ref to store the interval

    // Sync liveTrackPosition with trackPosition when the track is played or resumed
    useEffect(() => {
        setLiveTrackPosition(trackPosition); // Align the live position with trackPosition when updated
    }, [trackPosition]);

    // Handle counting when the track is playing
    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setLiveTrackPosition((prevPosition) => prevPosition + 1000); // Increment by 1 second (1000ms)
            }, 1000); // Update every second
        } else {
            clearInterval(intervalRef.current); // Stop counting when paused
        }

        // Clean up the interval on unmount or when paused
        return () => clearInterval(intervalRef.current);
    }, [isPaused]);

    // Handle play/pause toggle
    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    function millisToMinutesAndSeconds(millis) {
        if (!millis) return "00:00"; // Ensure we return a valid format if millis is 0 or undefined
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

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
                                <p>{millisToMinutesAndSeconds(liveTrackPosition)}</p>
                            </div>
                            <div id="col-bar" className="col d-flex justify-content-center align-items-center">
                                <input id="progress-bar" type="range" min={0} max={currentTrack.duration_ms} value={liveTrackPosition}/>
                            </div>
                            <div id="col-right-time" className="col-1 d-flex justify-content-center align-items-center">
                                <p>{millisToMinutesAndSeconds(currentTrack.duration_ms)}</p>
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


/* import React, { useState, useEffect } from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";

function TrackPlayer({ isPaused, isActive, currentTrack, trackPosition, playTrack, pauseTrack }) {
    const [liveTrackPosition, setLiveTrackPosition] = useState(0);

    useEffect(() => {
        if(!isPaused) {
            setTimeout(() => setLiveTrackPosition(liveTrackPosition + 1), 1);
        }
    }, [trackPosition]);

    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    console.log("trackPosition", trackPosition);
    console.log("liveTrackPosition", liveTrackPosition);
    
    function millisToMinutesAndSeconds(millis) {
        if (!millis) return "00:00"; // Ensure we return a valid format if millis is 0 or undefined
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

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
                                <p>{millisToMinutesAndSeconds(liveTrackPosition)}</p>
                            </div>
                            <div id="col-bar" className="col d-flex justify-content-center align-items-center">
                                <input id="progress-bar" type="range" min={0} max={currentTrack.duration_ms} value={liveTrackPosition}/>
                            </div>
                            <div id="col-right-time" className="col-1 d-flex justify-content-center align-items-center">
                                <p>{millisToMinutesAndSeconds(currentTrack.duration_ms)}</p>
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