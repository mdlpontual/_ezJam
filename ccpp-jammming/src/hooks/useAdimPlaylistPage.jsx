import React, { useState, useEffect, useCallback } from "react";
import UserPlaylists from "../components/ui/home/playlists_container/user_playlists/UserPlaylists";
import OpenPlaylist from "../components/ui/home/playlists_container/open_playlist/OpenPlaylist";

// Debounce function
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

function useAdimPlaylistPage(updateUri, playTrack, pauseTrack, handleArtistClick, handleAlbumClick, accessToken) {
    const [activePlaylistPage, setActivePlaylistPage] = useState();

    // Debounced function for setting the page
    const debouncedSetPage = useCallback(debounce((newPage) => {
        setActivePlaylistPage(newPage);
    }, 100), []);

    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if (!accessToken) {
            setActivePlaylistPage();
        } else {
            const newPage = (
                <UserPlaylists
                    onPlaylistClick={handleClickToOpenPlaylist}
                    offPlaylistClick={handleClickToClosePlaylist}
                    onPlayButton={updateUri} 
                    onArtistClick={handleArtistClick}
                    onAlbumClick={handleAlbumClick}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    accessToken={accessToken}/>
            )
            debouncedSetPage(newPage);
        }
    }, [ debouncedSetPage, accessToken]);

    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------

    const handleClickToOpenPlaylist = useCallback((playlistData, offPlaylistClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken) => {
        const newPage = (
            <OpenPlaylist 
                playlistData={playlistData}
                offPlaylistClick={offPlaylistClick}
                onPlayButton={onPlayButton} 
                onArtistClick={onArtistClick}
                onAlbumClick={onAlbumClick}
                playTrack={playTrack}
                pauseTrack={pauseTrack}
                accessToken={accessToken}/>
        );
        setActivePlaylistPage(newPage);
    }, []);

    const handleClickToClosePlaylist = useCallback((playlistData, offPlaylistClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken) => {
        const newPage = (
            <UserPlaylists
                onPlaylistClick={handleClickToOpenPlaylist}
                offPlaylistClick={handleClickToClosePlaylist}
                playlistData={playlistData}
                onPlayButton={onPlayButton} 
                onArtistClick={onArtistClick}
                onAlbumClick={onAlbumClick}
                playTrack={playTrack}
                pauseTrack={pauseTrack}
                accessToken={accessToken}/>
        );
        setActivePlaylistPage(newPage);
    }, []);
    

    return {activePlaylistPage};
};

export default useAdimPlaylistPage;