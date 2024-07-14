import React from "react";
import UserPlaylist from "./Playlists/UserPlaylists";
import OpenPlaylist from "./Playlists/OpenPlaylist";


function HomeContainers(){
    return(
        <>
            <section id="playlists-box" className="col">
                <UserPlaylist />
            </section>
            <section id="search-box" className="col">
                <OpenPlaylist />
            </section>
        </>
    )
}

export default HomeContainers;