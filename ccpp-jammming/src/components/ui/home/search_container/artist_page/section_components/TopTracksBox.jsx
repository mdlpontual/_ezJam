import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import TopTrack from "./unit_components/TopTrack";

function TopTracksBox({ fetchedArtistTopTracksArray, onPlayButton }) {
    return (
        <>
            <div id="top-five-container" className="container-fluid">
                <div id="top-five-row" className="row">
                    <div id="top-five-col" className="col">
                        <h4>Popular:</h4>
                        {fetchedArtistTopTracksArray.map((track, i) => (
                            <TopTrack topTrack={track} order={i} onPlayButton={onPlayButton} key={track.trackUri} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopTracksBox;