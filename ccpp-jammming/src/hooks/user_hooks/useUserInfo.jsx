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

    useEffect(() => {
        if (isDirty || !playlistsCache) {
            fetchUserPlaylists();
        } else if (isEdited) {
            setUserPlaylistsArr(playlistsCache);
        } else {
            setUserPlaylistsArr(playlistsCache);
        }

        const interval = setInterval(() => {
            fetchUserPlaylists();
        }, pollInterval);

        return () => clearInterval(interval);
    }, [accessToken]);

    const fetchUserPlaylists = async (forceRefetch = false) => {
        if (!accessToken) return;

        const now = Date.now();
        const rateLimitInterval = 30000; // Set a 30-second minimum interval between requests

        if (!forceRefetch && now - lastFetchTimestamp < rateLimitInterval) {
            console.warn("Fetch request skipped to prevent hitting rate limit.");
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

            const playlists = res.data.items.filter((playlist) => playlist.owner.display_name === "mdl.al").map((playlist) => ({
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
            console.log("fetchUserPlaylists", forceRefetch)

        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    };

    const refetchPlaylists = async (forceRefetch = false) => {
        isDirty = true;
        await fetchUserPlaylists(forceRefetch);
        console.log("refetchPlaylists", forceRefetch)
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

    const fetchUserInfo = async () => {
        if (!accessToken) return;

        if (userInfoCache) {
            setUserInfo(userInfoCache);
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
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [accessToken]);

    return { userInfo, userPlaylistsArr, setUserPlaylistsArr, refetchPlaylists, editPlaylists };
}

export default useUserInfo;


/* import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        if (isDirty || !playlistsCache) {
            fetchUserPlaylists();
        } else if (isEdited) {
            setUserPlaylistsArr(playlistsCache);
        } else {
            setUserPlaylistsArr(playlistsCache);
        }

        const interval = setInterval(() => {
            fetchUserPlaylists();
        }, pollInterval);

        return () => clearInterval(interval);
    }, [accessToken]);

    const fetchUserPlaylists = async () => {
        if (!accessToken) return;

        const now = Date.now();
        const rateLimitInterval = 30000; // Set a 30-second minimum interval between requests

        if (now - lastFetchTimestamp < rateLimitInterval) {
            console.warn("Fetch request skipped to prevent hitting rate limit.");
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

            const playlists = res.data.items.filter((playlist) => playlist.owner.display_name === "mdl.al").map((playlist) => ({
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

    const refetchPlaylists = async () => {
        isDirty = true;
        await fetchUserPlaylists();
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

    const fetchUserInfo = async () => {
        if (!accessToken) return;

        if (userInfoCache) {
            setUserInfo(userInfoCache);
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
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [accessToken]);

    return { userInfo, userPlaylistsArr, setUserPlaylistsArr, refetchPlaylists, editPlaylists };
}

export default useUserInfo;
 */

/* import React, { useState, useEffect } from "react";
import axios from "axios";
import IMG from "../../assets/images/ImagesHUB";

// Cache and dirty flag for playlists
let playlistsCache = null;
let isDirty = false;
let isEdited = false;

let userInfoCache = null; // Cache for user info

function useUserInfo({ accessToken, limit = 50, offset = 0, market = 'US', pollInterval = 60000 }) {
    const [userInfo, setUserInfo] = useState({});
    const [userPlaylistsArr, setUserPlaylistsArr] = useState([]);

    useEffect(() => {
        // If cache is dirty or null, fetch fresh data
        if (isDirty || !playlistsCache) {
            fetchUserPlaylists();
        } else if (isEdited) {
            // Reassign new playlist title if the playlist was edited
            setUserPlaylistsArr(playlistsCache);
        } else {
            setUserPlaylistsArr(playlistsCache); // Use cached playlists
        }

        const interval = setInterval(() => {
            fetchUserPlaylists();
        }, pollInterval);

        return () => clearInterval(interval);
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
                    : IMG.placeHolders,
            }));

            // Always set the state and cache, even if no changes detected
            setUserPlaylistsArr(playlists);
            playlistsCache = playlists; // Update the cache
            isDirty = false; // Reset dirty flag

        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    };

    const refetchPlaylists = async () => {
        isDirty = true;
        await fetchUserPlaylists();
    }

    const editPlaylists = async (newPlaylistName = "", playlistId = "") => {
        isEdited = true; // Mark the cache as edited

        if (newPlaylistName && playlistId) {
            // Update the cached playlist's title directly
            playlistsCache = playlistsCache.map((playlist) => 
                playlist.playlistId === playlistId
                    ? { ...playlist, playlistTitle: newPlaylistName }
                    : playlist
            );

            // Set the updated cache to state
            setUserPlaylistsArr(playlistsCache);
        }
    };

    const fetchUserInfo = async () => {
        if (!accessToken) return;

        if (userInfoCache) {
            setUserInfo(userInfoCache); // Use cached user info
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
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [accessToken]);

    return { userInfo, userPlaylistsArr, setUserPlaylistsArr, refetchPlaylists, editPlaylists };
}

export default useUserInfo; */