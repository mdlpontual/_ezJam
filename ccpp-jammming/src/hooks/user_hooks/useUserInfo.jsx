import React, { useState, useEffect } from "react";
import axios from "axios";
import IMG from "../../assets/images/ImagesHUB";

// Cache, dirty flag, and rate limit controls
let playlistsCache = null;
let isDirty = false;
let isEdited = false;
let userInfoCache = null; // Cache for user info
let lastFetchTimestamp = 0; // Track last fetch time

function useUserInfo({ accessToken, limit = 50, offset = 0, market = 'US', pollInterval = 60000 }) {
    const [userInfo, setUserInfo] = useState({});
    const [userPlaylistsArr, setUserPlaylistsArr] = useState([]);
    const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false); // Track if userInfo is loaded

    useEffect(() => {
        if (isUserInfoLoaded) {
            if (isDirty || !playlistsCache) {
                fetchUserPlaylists();
            } else if (isEdited) {
                setUserPlaylistsArr(playlistsCache);
            } else {
                setUserPlaylistsArr(playlistsCache);
            }
        }
    }, [accessToken, isUserInfoLoaded]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isUserInfoLoaded) {
                fetchUserPlaylists();
            }
        }, pollInterval);

        return () => clearInterval(interval);
    }, [accessToken, isUserInfoLoaded]);

    const fetchUserInfo = async () => {
        if (!accessToken) return;

        if (userInfoCache) {
            setUserInfo(userInfoCache);
            setIsUserInfoLoaded(true); // Indicate userInfo is ready
            return;
        }

        try {
            const res = await axios.get(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            userInfoCache = res.data;
            setUserInfo(res.data);
            setIsUserInfoLoaded(true); // Indicate userInfo is ready
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const fetchUserPlaylists = async (forceRefetch = false) => {
        if (!accessToken || !isUserInfoLoaded) return; // Ensure userInfo is loaded

        const now = Date.now();
        const rateLimitInterval = 35000; // Set a 30-second minimum interval between requests

        if (!forceRefetch && now - lastFetchTimestamp < rateLimitInterval) {
            //console.warn("Fetch request skipped to prevent hitting rate limit.");
            return;
        }

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

            const playlists = res.data.items.filter((playlist) => playlist.owner.display_name === userInfo.display_name).map((playlist) => ({
                playlistId: playlist.id,
                playlistTitle: playlist.name,
                playlistUri: playlist.uri,
                playlistCover: playlist.images && playlist.images.length > 0 
                    ? playlist.images[playlist.images.length - 1].url 
                    : IMG.placeHolders,
            }));

            setUserPlaylistsArr(playlists);
            playlistsCache = playlists;
            isDirty = false;
            lastFetchTimestamp = now; // Update timestamp on successful fetch

        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    };

    const refetchPlaylists = async (forceRefetch = false) => {
        isDirty = true;
        await fetchUserPlaylists(forceRefetch);
    }

    const editPlaylists = async (newPlaylistName = "", playlistId = "") => {
        isEdited = true;

        if (newPlaylistName && playlistId) {
            playlistsCache = playlistsCache.map((playlist) => 
                playlist.playlistId === playlistId
                    ? { ...playlist, playlistTitle: newPlaylistName }
                    : playlist
            );
            setUserPlaylistsArr(playlistsCache);
        }
    };

    useEffect(() => {
        fetchUserInfo(); // Fetch user info first
    }, [accessToken]);

    return { userInfo, userPlaylistsArr, setUserPlaylistsArr, refetchPlaylists, editPlaylists };
}

export default useUserInfo;