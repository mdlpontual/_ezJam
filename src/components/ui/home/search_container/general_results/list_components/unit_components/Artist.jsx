import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Artist() {
    return (
        <>
            <div id="artist-thumbnail" className="col-auto d-flex justify-content-center align-items-center">
                <img src={IMG.profilePlaceHolder} alt="artist profile image" height="100px"/>
            </div>
            <div id="artist-name" className="col d-flex justify-content-start align-items-center">
                <h5>Red Hot Chilli Peppers</h5>
            </div>
        </>
    );
}

export default Artist;