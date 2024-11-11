import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function EmptyResultsPage() {
    return (
        <>
            <div id="empty-results-col" className="col d-flex flex-column justify-content-center align-items-center">
                <img src={IMG.notFound2PNG} alt="spotify empty" width="200px"/>
                <h3 id="sptf">Search by Artist, Album or Song Title.</h3>
                <p id="label-one">all content provided by:</p>
                <img id="sptf-logo" src={IMG.spotifyLogoWhite} alt="spotify logo" width="175px"/>
            </div>
        </>
    );
}

export default EmptyResultsPage;