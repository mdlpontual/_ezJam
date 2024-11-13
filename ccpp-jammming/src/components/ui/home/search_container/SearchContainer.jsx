import React, { useState } from "react";
import IMG from "../../../../assets/images/ImagesHUB";

function SearchContainer({ search, setSearch, activePage, goBack, goForward }) {
    
    const disableEnter = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };
  
    return (
        <>
            <div id="search-container" className="container-fluid d-flex flex-column">
                <div id="searchbar-row" className="row">
                    <div id="arrow-box-col" className="col-auto">
                        <div id="arrow-container" className="container">
                            <div id="arrow-row" className="row">
                                <a id="go-back" type="button" className="col-auto d-flex flex-column justify-content-center align-items-center" onClick={goBack}>
                                    <img id="back-white" src={IMG.gobackPNG} alt="go back button" width="22px"/>
                                    <img id="back-green" src={IMG.gobackGreenPNG} alt="go back button" width="22px"/>
                                </a>
                                <a id="go-foward" type="button" className="col-auto d-flex flex-column justify-content-center align-items-center" onClick={goForward}>
                                    <img id="foward-white" src={IMG.gofowardPNG} alt="go foward button" width="22px"/>
                                    <img id="foward-green" src={IMG.gofowardGreenPNG} alt="go foward button" width="22px"/>
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
                                <input 
                                    id="input-elem" 
                                    type="search" 
                                    placeholder="Search the Spotify Library" 
                                    className="col" 
                                    value={search} 
                                    onChange={e => setSearch(e.target.value)} 
                                    onKeyDown={disableEnter}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="results-row" className="row">
                    <div id="results-col" className="col d-flex">
                        {activePage}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchContainer;