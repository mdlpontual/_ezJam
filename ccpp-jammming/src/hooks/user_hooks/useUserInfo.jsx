import React, { useState, useEffect } from "react";
import axios from "axios";

let playlistsCache = null; // In-memory cache for playlists
let userInfoCache = null;  // In-memory cache for user info

function useUserInfo({ accessToken, limit = 50, offset = 0, market = 'US' }) {
    const [userInfo, setUserInfo] = useState({});
    const [userPlaylistsArr, setUserPlaylistsArr] = useState([]);

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            if (!accessToken) return;

            // Check cache first
            if (playlistsCache) {
                setUserPlaylistsArr(playlistsCache); // Use cached playlists
                return;
            }

            try {
                const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        limit: limit,    // Specify the number of albums to fetch
                        offset: offset,  // Specify the offset for pagination
                        market: market,  // Specify the market for albums
                    },
                });

                const playlists = res.data.items.filter((playlist) => playlist.owner.display_name === "mdl.al").map((playlist) => ({
                    playlistId: playlist.id,
                    playlistTitle: playlist.name,
                    playlistUri: playlist.uri,
                    playlistCover: playlist.images[playlist.images.length - 1]?.url || IMG.placeHolders,
                }));

                // Cache the fetched playlists
                playlistsCache = playlists;
                setUserPlaylistsArr(playlists);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        fetchUserPlaylists();
    }, [accessToken, limit, offset]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!accessToken) return;

            // Check cache first
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

                // Cache and set the user info
                userInfoCache = res.data;
                setUserInfo(res.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, [accessToken]);

    // Optionally, create a way to clear the cache when necessary
    const clearPlaylistsCache = () => {
        playlistsCache = null;
    };

    const clearUserInfoCache = () => {
        userInfoCache = null;
    };

    return { userInfo, userPlaylistsArr, clearPlaylistsCache, clearUserInfoCache };
}

export default useUserInfo;


/* import React, { useState, useEffect } from "react";
import axios from "axios";

function useUserInfo({ accessToken, limit = 50, offset = 0, market = 'US' }) {
    const [userInfo, setUserInfo] = useState({});
    const [userPlaylistsArr, setUserPlaylistsArr] = useState([]);

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            if (!accessToken) return;

            try {
                const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        limit: limit,    // Specify the number of albums to fetch
                        offset: offset,  // Specify the offset for pagination
                        market: market,  // Specify the market for albums
                    },
                });

                const playlists = res.data.items.filter((playlist) => playlist.owner.display_name === "mdl.al").map((playlist) => ({
                    playlistId: playlist.id,
                    playlistTitle: playlist.name,
                    playlistUri: playlist.uri,
                    playlistCover: playlist.images[playlist.images.length - 1]?.url || IMG.placeHolders,
                }));

                setUserPlaylistsArr(playlists);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        fetchUserPlaylists();
    }, [accessToken, limit, offset]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!accessToken) return;

            try {
                const res = await axios.get(`https://api.spotify.com/v1/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setUserInfo(res.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, [accessToken]);

    return { userInfo, userPlaylistsArr };
}

export default useUserInfo; */