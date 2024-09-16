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
    const [activePlaylistPage, setActivePlaylistPage] = useState(null);
    const [pageStack, setPageStack] = useState([]); // Stack to keep track of previous pages

    // Debounced function for setting the page
    const debouncedSetPage = useCallback(debounce((newPage) => {
        setActivePlaylistPage(newPage);
    }, 50), []);

    useEffect(() => {
        if (!accessToken) {
            setActivePlaylistPage();
        } else if (!activePlaylistPage) {
            // Only set the UserPlaylists if it's not already set
            const newPage = (
                <UserPlaylists
                    onPlaylistClick={handleClickToOpenPlaylist}
                    onPlayButton={updateUri} 
                    onArtistClick={handleArtistClick}
                    onAlbumClick={handleAlbumClick}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    accessToken={accessToken}/>
            );
            debouncedSetPage(newPage);
            setPageStack([newPage]); // Initialize the stack with the UserPlaylists page
        }
    }, [debouncedSetPage, accessToken, activePlaylistPage]);

    const handleClickToOpenPlaylist = useCallback((playlistData) => {
        const newPage = (
            <OpenPlaylist 
                playlistData={playlistData}
                onBackClick={handleClickToClosePlaylist}
                onPlayButton={updateUri} 
                onArtistClick={handleArtistClick}
                onAlbumClick={handleAlbumClick}
                playTrack={playTrack}
                pauseTrack={pauseTrack}
                accessToken={accessToken}/>
        );
        setPageStack(prevStack => [...prevStack, newPage]); // Push OpenPlaylist to the stack
        setActivePlaylistPage(newPage); // Update active page
    }, [updateUri, handleArtistClick, handleAlbumClick, playTrack, pauseTrack, accessToken]);

    const handleClickToClosePlaylist = useCallback(() => {
        setPageStack(prevStack => {
            const newStack = [...prevStack];
            newStack.pop(); // Remove the OpenPlaylist from the stack
            setActivePlaylistPage(newStack[newStack.length - 1]); // Set the previous page as active
            return newStack;
        });
    }, []);

    return { activePlaylistPage };
};

export default useAdimPlaylistPage;