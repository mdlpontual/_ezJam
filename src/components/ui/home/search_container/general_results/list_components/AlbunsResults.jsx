import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Album from "./unit_components/Album";

function AlbunsResults() {
    return (
        <>
            <div id="album-container" className="container">
                <div id="album-label" className="row">
                    <h4>album:</h4>
                </div>
                <div id="album-row" className="row">
                    <Album/>
                    <Album/>
                </div>
            </div>
        </>
    );
}

export default AlbunsResults;