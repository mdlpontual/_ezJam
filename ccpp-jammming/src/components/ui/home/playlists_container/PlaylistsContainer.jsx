import React, { useState, useEffect, useCallback, useMemo } from "react";
import UserPlaylists from "./user_playlists/UserPlaylists";
import OpenPlaylist from "./open_playlist/OpenPlaylist";

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

function PlaylistsContainer({ onPlayButton, playTrack, pauseTrack, onArtistClick, onAlbumClick, accessToken }) {
    const [activePlaylistPage, setActivePlaylistPage] = useState(null);
    const [pageStack, setPageStack] = useState([]); // Stack to keep track of previous pages

    // Memoized versions of the callbacks to prevent unnecessary re-renders
    const debouncedSetPage = useMemo(() => debounce((newPage) => {
        setActivePlaylistPage(newPage);
    }, 50), []);

    const handleClickToOpenPlaylist = useCallback((playlistData) => {
        const newPage = (
            <OpenPlaylist
                playlistData={playlistData}
                onBackClick={handleClickToClosePlaylist}
                onPlayButton={onPlayButton}
                onArtistClick={onArtistClick}
                onAlbumClick={onAlbumClick}
                playTrack={playTrack}
                pauseTrack={pauseTrack}
                accessToken={accessToken}
            />
        );
        setPageStack(prevStack => [...prevStack, newPage]); // Push OpenPlaylist to the stack
        setActivePlaylistPage(newPage); // Update active page
    }, [onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken]);

    const handleClickToClosePlaylist = useCallback(() => {
        setPageStack(prevStack => {
            const newStack = [...prevStack];
            newStack.pop(); // Remove the OpenPlaylist from the stack
            setActivePlaylistPage(newStack[newStack.length - 1]); // Set the previous page as active
            return newStack;
        });
    }, []);

    useEffect(() => {
        if (!accessToken || activePlaylistPage) return; // Prevent unnecessary renders

        const newPage = (
            <UserPlaylists
                onPlaylistClick={handleClickToOpenPlaylist}
                onPlayButton={onPlayButton}
                onArtistClick={onArtistClick}
                onAlbumClick={onAlbumClick}
                playTrack={playTrack}
                pauseTrack={pauseTrack}
                accessToken={accessToken}
            />
        );
        debouncedSetPage(newPage); // Debounced page setting
        setPageStack([newPage]); // Initialize the stack with the UserPlaylists page
    }, [accessToken, activePlaylistPage, handleClickToOpenPlaylist, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, debouncedSetPage]);

    return (
        <>
            {activePlaylistPage}
        </>
    );
};

export default PlaylistsContainer;