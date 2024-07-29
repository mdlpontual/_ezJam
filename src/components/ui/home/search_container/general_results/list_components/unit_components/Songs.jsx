import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Song() {
    return (
        <>
            <div id="single-track-container" className="container-fluid">
                <div id="single-track-row" className="row d-flex ps-1">
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <img src={IMG.placeHolders} height="40px"/>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>Aquatic Mouth Dance</h5>
                        <p>Red Hot Chilli Peppers</p>
                    </div>
                    <div id="col-album" className="col-3 d-flex justify-content-start align-items-center">
                        <p>Unlimited Love</p>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>4:20</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Song;