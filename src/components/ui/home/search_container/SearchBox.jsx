import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";

function SearchBox() {
    return (
        <>
            <div id="empty-search-container" className="container-fluid">
                <div id="empty-search-row" className="row">
                    <div id="empty-search-col" className="col d-flex justify-content-center align-items-start">
                        <form id="form-elem" method="POST" className="container-fluid d-flex flex-column justify-content-start align-items-center">
                            <div id="form-row" className="row justify-content-center align-items-center">
                                <a id="search-button" type="button" className="col-2 d-flex justify-content-center align-items-center">
                                    <img className="col" src={IMG.searchPNG} alt="search button" width="30px"/>
                                </a>
                                <input id="input-elem" type="search" placeholder="Search the Spotify Library" className="col"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchBox;