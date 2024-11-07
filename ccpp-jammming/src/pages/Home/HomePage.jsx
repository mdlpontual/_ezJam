import React, { useState, useEffect } from "react";
import HomeHeader from "../../components/ui/home/header/HomeHeader";
import SearchContainer from "../../components/ui/home/search_container/SearchContainer";
import PlaylistsContainer from "../../components/ui/home/playlists_container/PlaylistsContainer";
import TrackPlayer from "../../components/ui/home/track_player/TrackPlayer";
import useAdimSearchPage from "../../hooks/useAdimSearchPage";
import useAuth from "../../hooks/useAuth";
import usePlayTrack from "../../hooks/usePlayTrack";
import usePlayerControls from "../../hooks/usePlayerControls";
import { useTrack } from "../../hooks/TrackContext";
import useUserInfo from "../../hooks/user_hooks/useUserInfo";

function HomePage({ code }) {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("playlists"); // State to manage active tab

    const { currentTrackUri, updateCurrentTrackUri, updateCurrentTrackTitle, updateCurrentTrackArtist, 
            updateCurrentQueueUri, updateCurrentTrackAlbum, togglePausePlay } = useTrack();
    const { accessToken } = useAuth(code);
    const { uriTrack, uriQueue, 
            customUriQueue, updateUri, updateQueue } = usePlayTrack();
    const { isPaused, isActive, currentTrack, trackPosition, liveTrackPosition, 
            progressBarTrackPosition, playTrack, pauseTrack, previousTrack, 
            nextTrack, seekPosition, volumeControl, handleProgressBarChange } = usePlayerControls({uriTrack, uriQueue, customUriQueue, togglePausePlay, accessToken});
    const { userPlaylistsArr } = useUserInfo({accessToken});
    const { activePage, goBack, 
            goForward, handleArtistClick,
             handleAlbumClick } = useAdimSearchPage(search, updateUri, playTrack, pauseTrack, userPlaylistsArr, accessToken);

    // Function to handle when a new track is played
    const handlePlayTrack = () => {
        updateCurrentTrackUri(currentTrack.uri);
        updateCurrentTrackTitle(currentTrack.name);
        updateCurrentTrackArtist(currentTrack.artists[0].name);
        updateCurrentTrackAlbum(currentTrack.album.name);
        updateCurrentQueueUri(uriQueue);
    };

    // Tab-switching functions to be triggered by OpenPlaylist/PlaylistTrack
    const switchToSearchTab = () => setActiveTab("search");

    useEffect(() => {
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
                    <div id="playlists-col" className="col d-none d-md-block">  
                        <PlaylistsContainer
                            onPlayButton={updateUri} 
                            onArtistClick={(...args) => { handleArtistClick(...args); switchToSearchTab(); }}
                            onAlbumClick={(...args) => { handleAlbumClick(...args); switchToSearchTab(); }}
                            playTrack={playTrack}
                            pauseTrack={pauseTrack}
                            uriQueue={uriQueue}
                            updateQueue={updateQueue}
                            accessToken={accessToken}/>
                    </div>
                    <div id="search-col" className="col d-none d-md-block">
                        <SearchContainer 
                            search={search} 
                            setSearch={setSearch} 
                            activePage={activePage} 
                            goBack={goBack} 
                            goForward={goForward}/>
                    </div>

                    <div id="fused-col" className="col d-flex flex-column d-md-none">
                        <ul className="row nav nav-tabs justify-content-center nav-pills nav-fill" id="smallScreenTabs" role="tablist">
                            <li className="col nav-item justify-content-center align-items-center" role="presentation">
                                <button className={`nav-link ${activeTab === "playlists" ? "active" : ""}`} 
                                        id="playlists-tab" data-bs-toggle="tab" 
                                        data-bs-target="#playlists" type="button" 
                                        role="tab" aria-controls="playlists" 
                                        aria-selected={activeTab === "playlists"}
                                        onClick={() => setActiveTab("playlists")}>
                                    Playlists
                                </button>
                            </li>
                            <li className="col nav-item justify-content-center align-items-center" role="presentation">
                                <button className={`nav-link ${activeTab === "search" ? "active" : ""}`} 
                                        id="search-tab" data-bs-toggle="tab" 
                                        data-bs-target="#search" type="button" 
                                        role="tab" aria-controls="search" 
                                        aria-selected={activeTab === "search"}
                                        onClick={() => setActiveTab("search")}>
                                    Search
                                </button>
                            </li>
                        </ul>
                        <div className="row d-flex flex-grow-1 tab-content" id="smallScreenTabsContent">
                            <div className={`col tab-pane fade ${activeTab === "playlists" ? "show active" : ""}`} id="playlists" role="tabpanel" aria-labelledby="playlists-tab">
                                <PlaylistsContainer
                                    onPlayButton={updateUri} 
                                    onArtistClick={(...args) => { handleArtistClick(...args); switchToSearchTab(); }}
                                    onAlbumClick={(...args) => { handleAlbumClick(...args); switchToSearchTab(); }}
                                    playTrack={playTrack}
                                    pauseTrack={pauseTrack}
                                    uriQueue={uriQueue}
                                    updateQueue={updateQueue}
                                    accessToken={accessToken}
                                />
                            </div>
                            <div className={`col tab-pane fade ${activeTab === "search" ? "show active" : ""}`} id="search" role="tabpanel" aria-labelledby="search-tab">
                                <SearchContainer 
                                    search={search} 
                                    setSearch={setSearch} 
                                    activePage={activePage} 
                                    goBack={goBack} 
                                    goForward={goForward}
                                />
                            </div>
                        </div>
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
                            pauseTrack={pauseTrack}
                            previousTrack={previousTrack}
                            nextTrack={nextTrack}
                            seekPosition={seekPosition}
                            volumeControl={volumeControl}
                            onPlayButton={updateUri}
                            onArtistClick={handleArtistClick}
                            onAlbumClick={handleAlbumClick}
                            onPlayTrack={handlePlayTrack}
                            togglePausePlay={togglePausePlay}
                            currentTrackUri={currentTrackUri} 
                            userPlaylistsArr={userPlaylistsArr}
                            liveTrackPosition={liveTrackPosition}
                            progressBarTrackPosition={progressBarTrackPosition}
                            handleProgressBarChange={handleProgressBarChange}
                            accessToken={accessToken}/>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default HomePage;