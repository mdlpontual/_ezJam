import React, { useState, useEffect, useRef } from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";
import { useTrack } from "../../../../hooks/TrackContext"; 

function TrackPlayer({ isPaused, isActive, 
                        currentTrack, playTrack, 
                        pauseTrack, previousTrack, 
                        nextTrack, volumeControl, 
                        onPlayButton, onArtistClick, 
                        onAlbumClick, onPlayTrack, 
                        userPlaylistsArr, liveTrackPosition,
                        handleProgressBarChange, accessToken}) {

    const { updateCurrentTrackUri } = useTrack(); // Access the context

    // Update context when a new track is played
    useEffect(() => {
        if (currentTrack?.uri) {
            updateCurrentTrackUri(currentTrack.uri); // Update global state with the current track URI
            onPlayTrack(currentTrack.uri); // Notify parent component of the new track
        }
    }, [currentTrack, onPlayTrack, updateCurrentTrackUri]);

    // Handle play/pause toggle
    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack();
        } else {
            pauseTrack();
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

    // Inside the TrackPlayer component
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space") {
                e.preventDefault(); // Prevent scrolling
                handleTogglePlay();
            }
        };

        // Attach event listener
        window.addEventListener("keydown", handleKeyDown);

        // Clean up event listener
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPaused, playTrack, pauseTrack]); // Add dependencies to avoid stale state

    if (!isActive) {
        return (
            <div id="track-player-container" className="container-fluid d-flex justify-content-center align-items-center">
                <div id="track-player-row" className="row d-flex justify-content-center align-items-center">
                    <div id="track-player-text" className="col d-flex flex-column justify-content-center align-items-center">
                        <h4>Enable your music player!</h4>
                        <p> Open the Spotify app, go to "Connect to a Device" and click on "ezJam Track Player" </p>
                    </div>
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
                            userPlaylistsArr={userPlaylistsArr} 
                            accessToken={accessToken} />
                    </div>
                    <div id="col-player" className="col d-flex flex-column">
                        <div id="track-butttons-row" className="row d-flex justify-content-center align-items-center">
                            <div id="col-prev" className="col-auto d-flex justify-content-center align-items-center">
                                <img id="prev-white" src={IMG.previousPNG} alt="previous track button" height="25px" onClick={handlePreviousTrack} />
                                <img id="prev-green" src={IMG.previousGreenPNG} alt="previous track button" height="25px" onClick={handlePreviousTrack} />
                            </div>
                            <div id="col-play" className="col-auto d-flex justify-content-center align-items-center">
                                <a id="togglePlay-button" type="button" onClick={handleTogglePlay} >
                                    <img id="play-pause-white" src={isPaused ? IMG.playPNG : IMG.pausePNG} alt="play pause button" height="40px" />
                                    <img id="play-pause-green" src={isPaused ? IMG.playGreenPNG : IMG.pauseGreenPNG} alt="play pause button" height="40px" />
                                </a>
                            </div>
                            <div id="col-next" className="col-auto d-flex justify-content-center align-items-center">
                                <img id="next-white" src={IMG.nextPNG} alt="next track button" height="25px" onClick={handleNextTrack} />
                                <img id="next-green" src={IMG.nextGreenPNG} alt="next track button" height="25px" onClick={handleNextTrack} />
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
                                    onChange={(e) => handleProgressBarChange(e)} // Pass accurate value to seek function
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