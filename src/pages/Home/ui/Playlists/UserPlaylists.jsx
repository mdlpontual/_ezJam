import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import PlaylisRow from "./PlaylistRow";

function UsersPlaylists(){
    return(
        <>
            <div id="pl-container" className="container h-100 d-flex flex-column">
                <div id="pl-header-row" className="row align-items-center">
                    <div id="pl-header-col-title" className="col h-100 d-flex align-items-center">
                        <h3>(User's) Playlists:</h3>
                    </div>
                    <div id="pl-header-col-add" className="col-auto h-100 d-flex justify-content-end align-items-center">
                        <img id="pl-header-col-add" src={IMG.plusPNG} alt="add playlist button" width="45px"/>
                    </div>
                </div>
                <div id="pl-body-row" className="row flex-grow-1">
                    <PlaylisRow />
                </div>
            </div>
        </>
    );
}

export default UsersPlaylists;