import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function ArtistPage({ artistContent }) {
    if (!artistContent || !artistContent.artistBanner) {
        return (
            <div id="artist-page-container" className="container-fluid">
                <div id="artist-page-banner-row" className="row">
                    {/* Fallback Image or Loading State */}
                    <img src={IMG.defaultBanner} alt="default artist banner" />
                    <div id="filter"></div>
                    <div id="artist-page-banner-col" className="col d-flex justify-content-start align-items-end">
                        <h1>Loading artist...</h1> {/* Fallback text */}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div id="artist-page-container" className="container-fluid">
                <div id="artist-page-banner-row" className="row">
                    <img src={artistContent.artistBanner} alt="artist image" />
                    <div id="filter"></div>
                    <div id="artist-page-banner-col" className="col d-flex justify-content-start align-items-end">
                        <h1>{artistContent.artistName}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ArtistPage;


/* import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import TopFive from "./section_components/TopFive";
import Discography from "./section_components/Discography";

function ArtistPage({ artistContent }) {
    return (
        <>
            <div id="artist-page-container" className="container-fluid">
                <div id="artist-page-banner-row" className="row">
                    <img src={artistContent.artistBanner} alt="artist image" />
                    <div id="filter"></div>
                    <div id="artist-page-banner-col" className="col d-flex justify-content-start align-items-end">
                        <h1>{artistContent.artistName}</h1>
                    </div>
                </div>
                <div id="artist-page-top-five-row" className="row">
                    <div id="artist-page-top-five-col" className="col">
                        <TopFive />
                    </div>
                </div>
                <div id="artist-page-disco-row" className="row">
                    <div id="artist-page-disco-col" className="col">
                        <Discography albumContent={albumContent} />
                    </div>
                </div> 
            </div>
        </>
    );
}

export default ArtistPage; */