import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Album() {
    return (
        <>
            <div id="album-thumbnail" className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                <img src={IMG.placeHolders} alt="album cover"/>
                <h6>Unlimited Love</h6>
                <p>2022 - Album</p>
            </div>
        </>
    );
}

export default Album;