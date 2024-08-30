import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackDisplay from "./unit_components/TrackDisplay";
import TrackVolume from "./unit_components/TrackVolume";
import useAuth from "../../../../hooks/useAuth";

function TrackPlayer({}) {
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
                                <img src={IMG.noshufflePNG} alt="shuffle button" height="20px"/>
                            </div>
                            <div id="col-prev" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.previousPNG} alt="previous track button" height="20px"/>
                            </div>
                            <div id="col-play" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.playPNG} alt="play pause button" height="35px"/>
                            </div>
                            <div id="col-next" className="col-auto d-flex justify-content-center align-items-center">
                                <img src={IMG.nextPNG} alt="next track button" height="20px"/>
                            </div>
                            <div id="col-repeat" className="col d-flex justify-content-start align-items-center">
                                <img src={IMG.norepeatPNG} alt="repeat button" height="20px"/>
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
                        <TrackVolume/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrackPlayer;