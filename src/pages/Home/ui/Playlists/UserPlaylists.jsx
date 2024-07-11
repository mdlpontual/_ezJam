import React from "react";
import PlaylistRow from "./PlaylistRow";
import IMG from "../../../../assets/images/ImagesHUB";

function UsersPlaylists(){
    return(
        <>
            <div id="user-playlists-container" className="container">
                <div id="user-playlists-header" className="row">
                    <div id="pl-header-title" className="col-auto">
                        <h3>(User's) Playlists:</h3>
                    </div>
                    <div id="pl-add-button" className="col">
                        <img src={IMG.plusSymbol} alt="" height="40px" />
                    </div>
                </div>
                <div id="user-playlists-body" className="row">
                    <div id="num-col" className="col-1">

                    </div>
                    <div id="rows-col" className="col">
                        <ol id="pl-ol">
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersPlaylists;