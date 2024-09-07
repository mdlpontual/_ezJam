import React, { useState, useEffect } from "react";
import HomeHeader from "../../components/ui/home/header/HomeHeader";
import UserPlaylists from "../../components/ui/home/playlists_container/user_playlists/UserPlaylists";
import SearchContainer from "../../components/ui/home/search_container/SearchContainer";
import TrackPlayer from "../../components/ui/home/track_player/TrackPlayer";
import OpenPlaylist from "../../components/ui/home/playlists_container/open_playlist/OpenPlaylist";
import useAdimPlaylistPage from "../../hooks/useAdimPlaylistPage";
import useAuth from "../../hooks/useAuth";
import usePlayTrack from "../../hooks/usePlayTrack";
import usePlayerControls from "../../hooks/usePlayerControls";

function HomePage({ code }) {
    const { accessToken } = useAuth(code);
    const { uriTrack, updateUriTrack } = usePlayTrack();
    const { isPaused, isActive, currentTrack, trackPosition, playTrack, pauseTrack } = usePlayerControls(uriTrack);
    const isPlaylistOpen = useAdimPlaylistPage();

    useEffect(() => {
        // Assign the accessToken to a global variable when it's available
        if (accessToken) {
            window.spotifyAccessToken = accessToken;
        }
    }, [accessToken]);

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
                        <SearchContainer onPlayButton={updateUriTrack} accessToken={accessToken}/>
                    </div>
                </main>
                <footer id="footer-row" className="row">
                    <div id="footer-col" className="col">
                        <TrackPlayer 
                            isPaused={isPaused}
                            isActive={isActive}
                            currentTrack={currentTrack}
                            trackPosition={trackPosition}
                            playTrack={playTrack}
                            pauseTrack={pauseTrack}/>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default HomePage;