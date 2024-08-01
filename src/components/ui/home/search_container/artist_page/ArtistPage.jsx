import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import TopFive from "./section_components/TopFive";
import Discography from "./section_components/Discography";

function ArtistPage() {
    return (
        <>
            <div id="artist-page-container" className="container-fluid d-flex flex-column">
                <div id="artist-page-banner-row" className="row" background="../assets/images/background/01_rhcp-placeholder.jpg">
                    <div id="artist-page-banner-col" className="col d-flex justify-content-start align-items-end">
                        <h1>Red Hot Chili Peppers</h1>
                    </div>
                </div>
                <div id="artist-page-top-five-row" className="row">
                    <div id="artist-page-top-five-col" className="col">
                        <TopFive/>
                    </div>
                </div>
                <div id="artist-page-disco-row" className="row flex-grow-1">
                    <div id="artist-page-top-five-col" className="col">
                        <Discography/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ArtistPage;