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

function HomePage({ code }) {
    const [search, setSearch] = useState("");
    
    const { currentTrackUri, updateCurrentTrackUri, updateCurrentTrackTitle, updateCurrentTrackArtist, updateCurrentQueueUri, updateCurrentTrackAlbum } = useTrack(); 

    const { accessToken } = useAuth(code);
    const { uriTrack, uriQueue, customUriQueue, updateUri, updateQueue } = usePlayTrack();
    const { isPaused, isActive, currentTrack, trackPosition, playTrack, pauseTrack, previousTrack, nextTrack, seekPosition, volumeControl } = usePlayerControls({uriTrack, uriQueue, customUriQueue});
    const { activePage, goBack, goForward, handleArtistClick, handleAlbumClick } = useAdimSearchPage(search, updateUri, playTrack, pauseTrack, accessToken);

    // Function to handle when a new track is played
    const handlePlayTrack = () => {
        updateCurrentTrackUri(currentTrack.uri);
        updateCurrentTrackTitle(currentTrack.name);
        updateCurrentTrackArtist(currentTrack.artists[0].name);
        updateCurrentTrackAlbum(currentTrack.album.name);
        updateCurrentQueueUri(uriQueue);
    };

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
                    <div id="playlists-col" className="col">  
                        <PlaylistsContainer
                            onPlayButton={updateUri} 
                            onArtistClick={handleArtistClick}
                            onAlbumClick={handleAlbumClick}
                            playTrack={playTrack}
                            pauseTrack={pauseTrack}
                            uriQueue={uriQueue}
                            updateQueue={updateQueue}
                            accessToken={accessToken}/>
                    </div>
                    <div id="search-col" className="col">
                        <SearchContainer 
                            search={search} 
                            setSearch={setSearch} 
                            activePage={activePage} 
                            goBack={goBack} 
                            goForward={goForward}/>
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
                            currentTrackUri={currentTrackUri} 
                            accessToken={accessToken}/>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default HomePage;
