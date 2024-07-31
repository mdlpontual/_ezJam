import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function EmptyResultsPage() {
    return (
        <>
            <div id="empty-results-col" className="col d-flex flex-column justify-content-center align-items-center">
                <img src={IMG.spotifySearch2PNG} alt="spotify empty" width="200px"/>
                <h3 id="sptf">search by artist, album or title</h3>
            </div>
        </>
    );
}

export default EmptyResultsPage;