import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Artists() {
    return (
        <>
            <div id="artist-inner-row" className="row">
                <div id="artist-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={IMG.profilePlaceHolder} alt="profile picture" height="70px"/>
                </div>
                <div id="artist-name" className="col d-flex justify-content-start align-items-center">
                    <h5>Red Hot Chili Peppers</h5>
                </div>
            </div>
        </>
    );
}

export default Artists;