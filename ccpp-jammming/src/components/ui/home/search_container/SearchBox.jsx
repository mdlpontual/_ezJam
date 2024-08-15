import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import EmptyResultsPage from "./non_results/EmptyResultsPage";
import NoResultsPage from "./non_results/NoResultsPage";
import GeneralResultsPage from "./general_results/GeneralResultsPage";
import ArtistPage from "./artist_page/ArtistPage";
import AlbumPage from "./album_page/AlbumPage";
import SearchInput from "../../../SearchInput";

function SearchBox({ code }) {
    return (
        <>
            <div id="search-container" className="container-fluid d-flex flex-column">
                <div id="searchbar-row" className="row">
                    <div id="arrow-box-col" className="col-auto">
                        <div id="arrow-container" className="container">
                            <div id="arrow-row" className="row">
                                <a id="go-back" type="button" className="col-auto d-flex flex-column justify-content-center align-items-center">
                                    <img src={IMG.gobackPNG} alt="go back button" width="22px"/>
                                </a>
                                <a id="go-foward" type="button" className="col-auto d-flex flex-column justify-content-center align-items-center">
                                    <img src={IMG.gofowardPNG} alt="go foward button" width="22px"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="searchbar-col" className="col d-flex flex-column justify-content-center align-items-center">
                        <form id="form-elem" method="POST" className="container-fluid d-flex flex-column justify-content-center align-items-center">
                            <div id="form-row" className="row justify-content-center align-items-center">
                                <div id="search-button" className="col-2 d-flex justify-content-center align-items-center">
                                    <img className="col" src={IMG.searchPNG} alt="search button" width="30px"/>
                                </div>
                                <SearchInput code={code}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="results-row" className="row">
                    <div id="results-col" className="col d-flex">
                        <GeneralResultsPage/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchBox;