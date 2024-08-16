import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Songs({ song }) {
    let songCover;
    if (song.cover) {
        songCover = song.cover;
    } else {
        songCover = IMG.placeHolders;
    }
    return (
        <>
            <div id="songs-inner-row" className="row">
                <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                    <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="20px"/>
                </div>
                <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={song.cover} height="40px"/>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{song.title}</h5>
                    <p>{song.artist}</p>
                </div>
                <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                    <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                </div>
                <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                    <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                </div>
                <div id="col-album" className="col-2 d-flex justify-content-start align-items-center">
                    <p>{song.album}</p>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{song.duration / 60000}</p>
                </div>
            </div> 
        </>
    );
}

export default Songs;