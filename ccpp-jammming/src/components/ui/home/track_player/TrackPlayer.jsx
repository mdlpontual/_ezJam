import React, { useState, useEffect } from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";
import usePlayerDataFetch from "../../../../hooks/usePlayerDataFetch";
import usePlayerDataPost from "../../../../hooks/usePlayerDataPost";

function TrackPlayer({ uriTrack, accessToken }) {
    const { currentPlayingTrack, availableDevices } = usePlayerDataFetch({ uriTrack, accessToken });
    const { startPlayback, pausePlayback, isPlaying } = usePlayerDataPost({ availableDevices, uriTrack, accessToken });

    console.log("currentPlayingTrack", currentPlayingTrack)
    console.log("availableDevices", availableDevices)

    /* 
    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const albumCover = playbackState.item.album.images[1].url;
    const trackName = playbackState.item.name;
    const artistName = playbackState.item.artists[0].name;
    const trackDuration = millisToMinutesAndSeconds(playbackState.item.duration_ms); 
    const timeStamp = millisToMinutesAndSeconds(playbackState.timestamp);
    const progressMS = millisToMinutesAndSeconds(playbackState.progress_ms); 
    */
   
    useEffect(() => {
        if (uriTrack && availableDevices.length > 0) {
            startPlayback();
        }
    }, [uriTrack, availableDevices]);

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
                                    src={isPlaying ? IMG.pausePNG : IMG.playPNG}
                                    alt="play pause button"
                                    height="35px"
                                    onClick={isPlaying ? pausePlayback : startPlayback}
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

export default TrackPlayer;
