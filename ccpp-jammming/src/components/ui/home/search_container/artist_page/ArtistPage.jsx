import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import TopTracksBox from "./section_components/TopTracksBox";
import DiscographyBox from "./section_components/DiscographyBox";
import useFetchContent from "../../../../../hooks/useFetchContent";

function ArtistPage({ artistContent, accessToken }) {
    const idArtist = artistContent.artistId;
    const fetchedArtistDiscographyArray = useFetchContent({ idArtist, accessToken })

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
                        {/* <TopTracksBox /> */}
                    </div>
                </div>
                <div id="artist-page-disco-row" className="row">
                    <div id="artist-page-disco-col" className="col">
                        <DiscographyBox />
                    </div>
                </div> 
            </div>
        </>
    );
}

export default ArtistPage;