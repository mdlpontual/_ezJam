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

function useAdimPlaylistPage(updateUri, playTrack, pauseTrack, accessToken) {
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
                    accessToken={accessToken}/>
            )
            debouncedSetPage(newPage);
        }
    }, [ debouncedSetPage, accessToken]);

    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------

    const handleClickToOpenPlaylist = useCallback((playlistData, offPlaylistClick, accessToken) => {
        const newPage = (
            <OpenPlaylist 
                playlistData={playlistData}
                offPlaylistClick={offPlaylistClick}
                accessToken={accessToken}/>
        );
        setActivePlaylistPage(newPage);
    }, []);

    const handleClickToClosePlaylist = useCallback((accessToken) => {
        const newPage = (
            <UserPlaylists
                onPlaylistClick={handleClickToOpenPlaylist}
                offPlaylistClick={handleClickToClosePlaylist}
                accessToken={accessToken}/>
        );
        setActivePlaylistPage(newPage);
    }, []);
    

    return {activePlaylistPage};
};

export default useAdimPlaylistPage;