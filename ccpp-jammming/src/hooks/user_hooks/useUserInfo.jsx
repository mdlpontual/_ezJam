import React, { useState, useEffect } from "react";
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

                const playlists = res.data.items.filter((playlist) => playlist.owner.display_name === "m").map((playlist) => ({
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

export default useUserInfo;