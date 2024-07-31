import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Albuns() {
    return (
        <>
            <div id="albuns-inner-row" className="row">
                <div id="album-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={IMG.placeHolders} alt="album cover" height="50px"/>
                </div>
                <div id="album-title" className="col d-flex justify-content-start align-items-center">
                    <h5>Unlimited Love</h5>
                </div>
            </div>  
        </>
    );
}

export default Albuns;