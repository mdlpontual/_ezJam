import React, { useState, useEffect } from "react";
import HomeHeader from "../../components/ui/home/header/HomeHeader";
import UserPlaylists from "../../components/ui/home/playlists_container/user_playlists/UserPlaylists";
import SearchContainer from "../../components/ui/home/search_container/SearchContainer";
import TrackPlayer from "../../components/ui/home/track_player/TrackPlayer";
import OpenPlaylist from "../../components/ui/home/playlists_container/open_playlist/OpenPlaylist";
import useAdimPlaylistPage from "../../hooks/useAdimPlaylistPage";

function HomePage({ code }) {
    const isPlaylistOpen = useAdimPlaylistPage();
    return (
        <>
            <div id="home-page-container" className="container-fluid d-flex flex-column">
                <header id="header-row" className="row">
                    <div id="header-col" className="col">
                        <HomeHeader/>
                    </div>
                </header>
                <main id="main-row" className="row flex-grow-1">
                    <div id="playlists-col" className="col">  
                        {isPlaylistOpen ? <OpenPlaylist /> : <UserPlaylists />}
                    </div>
                    <div id="search-col" className="col">
                        <SearchContainer code={code}/>
                    </div>
                </main>
                <footer id="footer-row" className="row">
                    <div id="footer-col" className="col">
                        <TrackPlayer/>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default HomePage;