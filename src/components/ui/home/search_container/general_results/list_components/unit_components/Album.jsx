import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Album() {
    return (
        <>
            <div id="single-track-container" className="container-fluid">
                <div id="single-track-row" className="row d-flex ps-1">
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <img src={IMG.placeHolders} height="40px"/>
                    </div>
                    <div id="col-album" className="col d-flex justify-content-start align-items-center">
                        <h5>Unlimited Love</h5>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Album;