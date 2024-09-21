import React, { useState, useEffect } from "react";
import axios from "axios";

function useReducePlaylistInfo({ playlistData, accessToken, limit = 100, offset = 0 }) {
    const [reducedPlaylistTracksArr, setReducedPlaylistTracksArr] = useState([]);
    const idPlaylist = playlistData.playlistId;

    useEffect(() => {
        const fetchReducedPlaylist = async () => {
            if (!idPlaylist || !accessToken) return;

            try {
                const res = await axios.get(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        limit: limit, 
                        offset: offset,
                    },
                });

                const tracks = res.data.items.map((track) => ({
                    trackUri: track.track.uri,
                }));

                setReducedPlaylistTracksArr(tracks);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.headers['retry-after'];
                    const retryAfterMs = (retryAfter ? parseInt(retryAfter) : 1) * 1000;
                    console.warn(`Rate limited. Retrying after ${retryAfterMs / 1000} seconds.`);

                    setTimeout(fetchReducedPlaylist, retryAfterMs);
                } else {
                    console.error("Error fetching playlist content:", error);
                }
            }
        };

        fetchReducedPlaylist();
    }, [idPlaylist, accessToken, limit, offset]);

    return { reducedPlaylistTracksArr };
}

export default useReducePlaylistInfo;
