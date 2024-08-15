import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import ArtistResults from "./list_components/ArtistResults";
import AlbumResults from "./list_components/AlbumResults";
import SongResults from "./list_components/SongResults";

function GeneralResultsPage() {
    return (
        <>
            <div id="gen-results-container" className="container-fluid">
                <div id="gen-results-artists" className="row">
                    <div id="gen-results-artists-col" className="col">
                        <ArtistResults/>
                    </div>
                </div>
                {/* <div id="gen-results-albuns" className="row">
                    <div id="gen-results-albuns-col" className="col">
                        <AlbumResults/>
                    </div>
                </div>
                <div id="gen-results-songs" className="row">
                    <div id="gen-results-songs-col" className="col">
                        <SongResults/>
                    </div>
                </div> */}
            </div>
        </>
    );       
}

export default GeneralResultsPage;

