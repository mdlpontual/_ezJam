import React from "react";
import HomeHeader from "../../components/ui/home/header/HomeHeader";
import UserPlaylists from "../../components/ui/home/playlists_container/user_playlists/UserPlaylists";
import SearchBox from "../../components/ui/home/search_container/SearchBox";
import TrackPlayer from "../../components/ui/home/track_player/TrackPlayer";

function HomePage() {
    return (
        <>
            <div id="home-page-container" className="container-fluid d-flex flex-column">
                <div id="header-row" className="row">
                    <div id="header-col" className="col">
                        <HomeHeader/>
                    </div>
                </div>
                <div id="main-row" className="row flex-grow-1">
                    <div id="playlists-col" className="col">
                        <UserPlaylists />
                    </div>
                    <div id="search-col" className="col">
                        <SearchBox />
                    </div>
                </div>
                <div id="footer-row" className="row">
                    <div id="footer-col" className="col">
                        <TrackPlayer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;