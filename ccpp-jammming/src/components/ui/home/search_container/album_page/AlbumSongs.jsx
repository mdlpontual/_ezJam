import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function AlbumSongs() {
    return (
        <>
            <div id="songs-inner-row" className="row">
                <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                    <h5 id="number-icon">2</h5>
                    <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="22px"/>
                </div>
                <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                    <div className="col">
                        <img src={IMG.placeHolders} height="40px"/>
                    </div>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>Aquatic Mouth Dance</h5>
                    <p>Red Hot Chilli Peppers</p>
                </div>
                <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                    <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                </div>
                <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                    <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                </div>
                <div id="col-album" className="col-2 d-flex justify-content-start align-items-center">
                    <p>Unlimited Love</p>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>4:20</p>
                </div>
            </div> 
        </>
    );
}

export default AlbumSongs;