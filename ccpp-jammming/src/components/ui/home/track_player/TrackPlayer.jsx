import React, { useState, useEffect, useRef } from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";
import { useTrack } from "../../../../hooks/TrackContext"; 

function TrackPlayer({
    isPaused, 
    isActive, 
    currentTrack, 
    trackPosition, 
    playTrack, 
    pauseTrack, 
    previousTrack, 
    nextTrack, 
    seekPosition, 
    volumeControl, 
    onPlayButton, 
    onArtistClick, 
    onAlbumClick, 
    onPlayTrack, 
    accessToken
}) {
    const [liveTrackPosition, setLiveTrackPosition] = useState(trackPosition); // Local track position
    const intervalRef = useRef(null); // Ref to store the interval
    const debounceRef = useRef(null); // Ref to store the debounce timeout
    const previousTrackUriRef = useRef(null); // Ref to store the previous track's URI

    const { updateCurrentTrackUri, togglePausePlay } = useTrack(); // Access the context

    // Update context when a new track is played
    useEffect(() => {
        if (currentTrack?.uri) {
            updateCurrentTrackUri(currentTrack.uri); // Update global state with the current track URI
            onPlayTrack(currentTrack.uri); // Notify parent component of the new track
        }
    }, [currentTrack, onPlayTrack, updateCurrentTrackUri]);

    // Sync liveTrackPosition with trackPosition when the track is played or resumed
    useEffect(() => {
        setLiveTrackPosition(trackPosition); // Align live position with trackPosition when updated
    }, [trackPosition]);

    // Handle counting when the track is playing
    useEffect(() => {
        if (!isPaused) {
            togglePausePlay(false); // Notify that track is playing
            clearInterval(intervalRef.current); // Clear any existing interval before starting a new one
            intervalRef.current = setInterval(() => {
                setLiveTrackPosition((prevPosition) => prevPosition + 1000); // Increment by 1 second (1000ms)
            }, 1000); // Update every second
        } else {
            togglePausePlay(true); // Notify that track is paused
            clearInterval(intervalRef.current); // Stop counting when paused
        }

        // Clean up the interval on unmount or when paused
        return () => clearInterval(intervalRef.current);
    }, [isPaused, togglePausePlay]);

    // Reset the progress bar when a new track starts playing
    useEffect(() => {
        if (currentTrack?.uri !== previousTrackUriRef.current) {
            // If the current track is different from the previous one, reset the progress bar
            setLiveTrackPosition(0); // Reset progress to 0 when the track changes
            previousTrackUriRef.current = currentTrack?.uri; // Update the previous track URI

            clearInterval(intervalRef.current); // Ensure the interval is reset
            if (!isPaused) {
                intervalRef.current = setInterval(() => {
                    setLiveTrackPosition((prevPosition) => prevPosition + 1000); // Increment by 1 second (1000ms)
                }, 1000); // Update every second
            }
        }
    }, [currentTrack, isPaused]);

    // Handle play/pause toggle
    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    // Handle previous track
    const handlePreviousTrack = () => {
        previousTrack();
    };

    // Handle next track
    const handleNextTrack = () => {
        nextTrack();
    };

    // Convert milliseconds to minutes and seconds for display
    function millisToMinutesAndSeconds(millis) {
        if (!millis) return "00:00"; // Ensure a valid format if millis is 0 or undefined
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    // Debounced progress bar change handler
    const handleProgressBarChange = (e) => {
        const newPosition = Number(e.target.value); // Get the new position from the input range
        setLiveTrackPosition(newPosition); // Update local state to reflect this change visually

        // Clear any existing timeout to prevent multiple API calls
        clearTimeout(debounceRef.current);

        // Set a new timeout to debounce the seekPosition API call
        debounceRef.current = setTimeout(() => {
            seekPosition(newPosition); // Call the seekPosition function after a delay
        }, 300); // Debounce delay of 300ms
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
                        <TrackDisplay 
                            currentTrack={currentTrack} 
                            onPlayButton={onPlayButton} 
                            onArtistClick={onArtistClick} 
                            onAlbumClick={onAlbumClick} 
                            accessToken={accessToken} />
                    </div>
                    <div id="col-player" className="col d-flex flex-column">
                        <div id="track-butttons-row" className="row d-flex justify-content-center align-items-center">
                            <div id="col-prev" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.previousPNG} alt="previous track button" height="20px" onClick={handlePreviousTrack} />
                            </div>
                            <div id="col-play" className="col-auto d-flex justify-content-center align-items-center">
                                <a id="togglePlay-button" type="button" onClick={handleTogglePlay} >
                                    <img src={isPaused ? IMG.playPNG : IMG.pausePNG} alt="play pause button" height="35px" />
                                </a>
                            </div>
                            <div id="col-next" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.nextPNG} alt="next track button" height="20px" onClick={handleNextTrack} />
                            </div>
                        </div>
                        <div id="progress-bar-row" className="row d-flex">
                            <div id="col-left-time" className="col-1 d-flex justify-content-center align-items-center">
                                <p>{millisToMinutesAndSeconds(liveTrackPosition)}</p>
                            </div>
                            <div id="col-bar" className="col d-flex justify-content-center align-items-center">
                                <input
                                    id="progress-bar"
                                    type="range"
                                    min={0}
                                    max={currentTrack?.duration_ms || 0} // Ensure duration is valid
                                    value={liveTrackPosition}
                                    onChange={handleProgressBarChange} // Pass accurate value to seek function
                                />
                            </div>
                            <div id="col-right-time" className="col-1 d-flex justify-content-center align-items-center">
                                <p>{millisToMinutesAndSeconds(currentTrack.duration_ms)}</p>
                            </div>
                        </div>
                    </div>
                    <div id="col-volume" className="col">
                        <TrackVolume volumeControl={volumeControl} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TrackPlayer;