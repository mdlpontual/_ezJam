import React from "react";
import UserPlaylist from "./Playlists/UserPlaylists";


function HomeContainers(){
    return(
        <>
            <section id="playlists-box" className="col">
                <UserPlaylist />
            </section>
            <section id="search-box" className="col">
                
            </section>
        </>
    )
}

export default HomeContainers;