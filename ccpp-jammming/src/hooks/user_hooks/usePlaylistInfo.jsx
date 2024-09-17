import React, { useState, useEffect } from "react";
import axios from "axios";

function usePlaylistInfo({ playlistData, accessToken }) {
    const [playlistTracksArr, setPlaylistTracksArr] = useState([]);
    const idPlaylist = playlistData.playlistId;

    useEffect(() => {
        const fetchPlaylist = async () => {
            if (!idPlaylist || !accessToken) return;

            try {
                // Fetch the playlist tracks
                const res = await axios.get(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // Extract artist IDs and make them unique to avoid redundant fetches
                const artistIds = [...new Set(res.data.items.map(track => track.track.artists[0]?.id))].filter(Boolean);

                // Fetch artist details including the banner image in parallel
                const artistsRes = await axios.get(`https://api.spotify.com/v1/artists`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        ids: artistIds.join(','),
                    },
                });

                const artistBanners = {};
                artistsRes.data.artists.forEach(artist => {
                    artistBanners[artist.id] = artist.images[0]?.url || null;  // Store the artist banner by artistId
                });

                // Map the playlist tracks and include the artistBanner fetched
                const tracks = res.data.items.map((track) => ({
                    trackId: track.track.id,
                    trackTitle: track.track.name,
                    trackAuthor: track.track.artists[0]?.name || "Unknown Artist", 
                    trackAlbum: track.track.album.name,
                    trackCover: track.track.album.images[track.track.album.images.length - 1]?.url || null,
                    trackUri: track.track.uri,
                    trackDuration: track.track.duration_ms,

                    artistId: track.track.artists[0]?.id || null, 
                    artistName: track.track.artists[0]?.name || "Unknown Artist",
                    artistBanner: artistBanners[track.track.artists[0]?.id] || null,
                     
                    albumId: track.track.album?.id || null, 
                    artistName: track.track.album.name,
                    albumCover: track.track.album.images[track.track.album.images.length - 1]?.url || null,
                }));

                setPlaylistTracksArr(tracks);
            } catch (error) {
                console.error("Error fetching playlist content:", error);
            }
        };

        fetchPlaylist();
    }, [idPlaylist, accessToken]);

    return { playlistTracksArr };
}

export default usePlaylistInfo;