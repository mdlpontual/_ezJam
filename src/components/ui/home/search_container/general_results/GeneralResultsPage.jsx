import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import Artists from "./list_components/Artists";
import Albuns from "./list_components/Albuns";
import Songs from "./list_components/Songs";

function GeneralResultsPage() {
    return (
        <>
            <div id="gen-results-container" className="container-fluid">
                <div id="gen-results-artists" className="row">
                    <div id="gen-results-artists-col" className="col">
                        <h4>artists:</h4>
                        <Artists/>
                    </div>
                </div>
                <div id="gen-results-albuns" className="row">
                    <div id="gen-results-albuns-col" className="col">
                        <h4>albuns:</h4>
                        <Albuns/>
                    </div>
                </div>
                <div id="gen-results-songs" className="row">
                    <div id="gen-results-songs-col" className="col">
                        <h4>songs:</h4>
                        <Songs/>
                    </div>
                </div>
            </div>
        </>
    );       
}

export default GeneralResultsPage;

