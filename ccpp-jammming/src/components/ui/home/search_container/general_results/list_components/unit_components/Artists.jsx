import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Artists({ artist }) {
    return (
        <>
            <div id="artist-inner-row" className="row">
                <div id="artist-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={artist.profile} alt="profile picture" height="70px"/>
                </div>
                <div id="artist-name" className="col d-flex justify-content-start align-items-center">
                    <h5>{artist.artist}</h5>
                </div>
            </div>
        </>
    );
}

export default Artists;