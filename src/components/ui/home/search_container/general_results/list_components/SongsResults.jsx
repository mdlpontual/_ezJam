import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Song from "./unit_components/Songs";

function SongsResults() {
    return (
        <>
            <div id="song-container" className="container">
                <div id="song-label" className="row">
                    <h4>songs:</h4>
                </div>
                <div id="song-row" className="row">
                    <Song/>
                </div>
            </div>
        </>
    );
}

export default SongsResults;