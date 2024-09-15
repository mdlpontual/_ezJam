import React, { useState, useEffect } from "react";
import axios from "axios";

function usePlaylistInfo({ playlistData, accessToken }) {
    const [playlistTracksArr, setPlaylistTracksArr] = useState([]);

    const idPlaylist = playlistData.playlistId;

    //-------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchPlaylist = async () => {
            if (!idPlaylist || idPlaylist.length === 0) return;
            if (!accessToken) return;
    
            try {
            const res = await axios.get(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`, {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            });

            const tracks = res.data.items.map((track) => ({
                trackId: track.track.id,
                trackTitle: track.track.name,
                trackAuthor: track.track.artists[0].name,
                trackAlbum: track.track.album.name,
                trackCover: track.track.album.images[track.track.album.images.length - 1]?.url,
                trackUri: track.track.uri,
                trackDuration: track.track.duration_ms
            })); 

            setPlaylistTracksArr(tracks);
            } catch (error) {
            console.error("Error fetching album content:", error);
            }
        };
    
        fetchPlaylist();
    }, [accessToken]);

    //-------------------------------------------------------------------------------------------------------------------------------------------

    return { playlistTracksArr };
};

export default usePlaylistInfo;