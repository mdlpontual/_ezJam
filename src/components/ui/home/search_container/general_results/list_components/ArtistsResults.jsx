import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Artist from "./unit_components/Artist";

function ArtistsResults() {
    return (
        <>
            <div id="artist-container" className="container">
                <div id="artist-label" className="row">
                    <h4>artists:</h4>
                </div>
                <div id="artist-row" className="row">
                    <Artist/>
                </div>
            </div>
        </>
    );
}

export default ArtistsResults;