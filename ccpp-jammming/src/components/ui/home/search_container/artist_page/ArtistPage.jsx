import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import TopFive from "./section_components/TopFive";
import Discography from "./section_components/Discography";

function ArtistPage() {
    /* let profilePicture;
    if (artist.profile) {
        profilePicture = artist.profile;
    } else {
        profilePicture = IMG.profilePlaceHolder;
    } */

    return (
        <>
            <div id="artist-page-container" className="container-fluid">
                <div id="artist-page-banner-row" className="row">
                    <img src={IMG.placeHolders} alt="artist image" />
                    <div id="filter"></div>
                    <div id="artist-page-banner-col" className="col d-flex justify-content-start align-items-end">
                        <h1>{}</h1>
                    </div>
                </div>
                <div id="artist-page-top-five-row" className="row">
                    <div id="artist-page-top-five-col" className="col">
                        <TopFive />
                    </div>
                </div>
                <div id="artist-page-disco-row" className="row">
                    <div id="artist-page-disco-col" className="col">
                        <Discography/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ArtistPage;