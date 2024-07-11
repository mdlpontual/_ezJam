import React from "react";
import UsersPlaylist from "./Playlists/UsersPlaylists";


function HomeContainers(){
    return(
        <>
            <section id="playlists-box" className="col">
                <UsersPlaylist />
            </section>
            <section id="search-box" className="col">
                
            </section>
        </>
    )
}

export default HomeContainers;