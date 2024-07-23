import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import Playlist from "./playlist/Playlist";

function UserPlaylists() {
    return (
        <>
            <div id="playlists-container" className="container-fluid d-flex flex-column">
                <header id="pl-header-row" className="row justify-content-center align-items-center">
                    <div id="pl-heading-col" className="col d-flex justify-content-start align-items-center">
                        <h3>(User's) Playlists:</h3>
                    </div>
                    <div id="add-button-col" className="col-auto d-flex justify-content-end align-items-center">
                        <img src={IMG.plusPNG} alt="add playlist button" height="40px"/>
                    </div>
                </header>
                <main id="pl-body-row" className="row flex-grow-1">
                    <div id="pl-body-col" className="col">
                        <Playlist />
                    </div>
                </main>
            </div>
        </>
    );
}

export default UserPlaylists;