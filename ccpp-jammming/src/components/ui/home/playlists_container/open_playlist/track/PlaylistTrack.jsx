import React from 'react';
import IMG from "../../../../../../assets/images/ImagesHUB";

function PlaylistTrack({ playlistTrack, order, accessToken }) {

    let cover;
    if (playlistTrack.trackCover) {
        cover = playlistTrack.trackCover;
    } else {
        cover = IMG.placeHolders;
    }

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    
    return (
        <>
            <div id="single-track-container" className="container-fluid">
                <div id="single-track-row" className="row">
                    <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                        <h5 id="number-icon">{order + 1}</h5>
                        <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="22px"/>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <div className="col">
                            <img src={cover} height="40px"/>
                        </div>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{playlistTrack.trackTitle}</h5>
                        <p>{playlistTrack.trackAuthor}</p>
                    </div>
                    <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                        <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                    </div>
                    <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                        <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                    </div>
                    <div id="col-album" className="col-2 d-flex justify-content-start align-items-center">
                        <p>{playlistTrack.trackAlbum}</p>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(playlistTrack.trackDuration)}</p>
                    </div>
                    <div id="col-saved" className="col-1 d-flex justify-content-center align-items-center">
                        <img id="saved-icon" src={IMG.savedPNG} height="20px" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaylistTrack;