import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import EmptyResultsPage from "./EmptyResultsPage";
import NoResultsPage from "./NoResultsPage";
import GeneralResultsPage from "./general_results/GeneralResultsPage";

function SearchBox() {
    return (
        <>
            <div id="search-container" className="container-fluid d-flex flex-column">
                <div id="searchbar-row" className="row">
                    <div id="searchbar-col" className="col d-flex flex-column justify-content-center align-items-center">
                        <form id="form-elem" method="POST" className="container-fluid d-flex flex-column justify-content-center align-items-center">
                            <div id="form-row" className="row justify-content-center align-items-center">
                                <a id="search-button" type="button" className="col-2 d-flex justify-content-center align-items-center">
                                    <img className="col" src={IMG.searchPNG} alt="search button" width="30px"/>
                                </a>
                                <input id="input-elem" type="search" placeholder="Search the Spotify Library" className="col"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="results-row" className="row flex-grow-1 flex-column">
                    <GeneralResultsPage/>
                </div>
            </div>
        </>
    );
}

export default SearchBox;