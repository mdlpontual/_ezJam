import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import ArtistsResults from "./list_components/ArtistsResults";
import AlbunsResults from "./list_components/AlbunsResults";
import SongsResults from "./list_components/SongsResults";

function GeneralResultsPage() {
    return (
        <>
            <div id="gen-results-container" className="container-fluid d-flex flex-column">
                <div id="artist-results-row" className="row flex-grow-1">
                    <div id="artist-results-col" className="col">
                        <ArtistsResults/>
                    </div>
                </div>
                <div id="album-results-row" className="row flex-grow-1">
                    <div id="album-results-col" className="col">
                        <AlbunsResults/>
                    </div>
                </div>
                <div id="song-results-row" className="row flex-grow-1">
                    <div id="song-results-col" className="col">
                        <SongsResults/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GeneralResultsPage;