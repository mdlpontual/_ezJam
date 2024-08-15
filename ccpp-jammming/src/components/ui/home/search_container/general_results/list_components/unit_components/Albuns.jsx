import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Albuns() {
    return (
        <>
            <div id="albuns-inner-row" className="row">
                <div id="album-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={IMG.placeHolders} alt="album cover" height="50px"/>
                </div>
                <div id="album-title" className="col d-flex flex-column justify-content-center align-items-start">
                    <h5>Unlimited Love</h5>
                    <p>2022 - Red Hot Chili Peppers</p>
                </div>
            </div>  
        </>
    );
}

export default Albuns;