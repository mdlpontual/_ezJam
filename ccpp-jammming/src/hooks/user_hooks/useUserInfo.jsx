import React, { useState, useEffect } from "react";
import axios from "axios";
import IMG from "../../assets/images/ImagesHUB";

// Cache and dirty flag for playlists
let playlistsCache = null;
let lastFetchTime = null;
let isDirty = false;

// Cache for user info
let userInfoCache = null;

function useUserInfo({ accessToken, limit = 50, offset = 0, market = 'US' }) {
    const [userInfo, setUserInfo] = useState({});
    const [userPlaylistsArr, setUserPlaylistsArr] = useState([]);

    useEffect(() => {
        if (!isDirty && playlistsCache) {
            setUserPlaylistsArr(playlistsCache); // Use cached playlists if not dirty
        } else {
            fetchUserPlaylists(); // Fetch fresh data if dirty or no cache exists
        }
    }, [accessToken]);

    const fetchUserPlaylists = async () => {
        if (!accessToken) return;

        try {
            const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    limit: limit,
                    offset: offset,
                    market: market,
                },
            });

            const playlists = res.data.items.filter((playlist) => playlist.owner.display_name === "mdl.al").map((playlist) => ({
                playlistId: playlist.id,
                playlistTitle: playlist.name,
                playlistUri: playlist.uri,
                playlistCover: playlist.images && playlist.images.length > 0 
                    ? playlist.images[playlist.images.length - 1].url 
                    : IMG.placeHolders,  // Use placeholder if no image is available
            }));

            setUserPlaylistsArr(playlists); // Update the playlists in state
            playlistsCache = playlists; // Store playlists in cache
            lastFetchTime = Date.now(); // Update fetch time
            isDirty = false; // Reset dirty flag
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    };

    const refetchPlaylists = async () => {
        // Mark the cache as dirty, forcing a refresh
        isDirty = true;
        await fetchUserPlaylists();
    };

    const fetchUserInfo = async () => {
        if (!accessToken) return;

        // Check cache for user info
        if (userInfoCache) {
            setUserInfo(userInfoCache); // Use cached user info if available
            return;
        }

        try {
            const res = await axios.get(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            userInfoCache = res.data; // Cache user info
            setUserInfo(res.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [accessToken]);

    return { userInfo, userPlaylistsArr, refetchPlaylists };
}

export default useUserInfo;