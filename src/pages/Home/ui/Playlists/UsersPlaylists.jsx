import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";

function UsersPlaylists(){
    return(
        <>
            <div id="user-playlist" className="container">
                <div id="playlist-header-row" className="row">
                    <div className="col">
                        <h3>(User's) Playlists</h3>
                        <img src={IMG.plusSymbol} alt="plus-symbol" height='45px'/>
                    </div>
                </div>
                <div id="playlist-content-row" className="row">
                    <h1>content</h1>
                </div>
            </div>
        </>
    );
}

export default UsersPlaylists;