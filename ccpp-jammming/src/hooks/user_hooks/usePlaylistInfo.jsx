import React, { useState, useEffect } from "react";
import axios from "axios";

function usePlaylistInfo({ playlistData, accessToken, trackLimit = 100, artistLimit = 50, offset = 0 }) {
    const [playlistTracksArr, setPlaylistTracksArr] = useState([]);
    const idPlaylist = playlistData.playlistId;

    useEffect(() => {
        const fetchPlaylist = async () => {
            if (!idPlaylist || !accessToken) return;

            try {
                // Fetch the playlist tracks with a limit of 100
                const res = await axios.get(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        limit: trackLimit, // Fetch up to 100 tracks
                        offset: offset,  
                    },
                });

                // Extract artist IDs and ensure they are unique
                const artistIds = [...new Set(res.data.items.map(track => track.track.artists[0]?.id))].filter(Boolean);

                // Paginate artist requests if artist IDs exceed the limit of 50
                const chunkedArtistIds = [];
                for (let i = 0; i < artistIds.length; i += artistLimit) {
                    chunkedArtistIds.push(artistIds.slice(i, i + artistLimit));
                }

                // Fetch artist details in chunks if necessary (to handle pagination)
                const artistBanners = {};
                for (const artistChunk of chunkedArtistIds) {
                    const artistsRes = await axios.get(`https://api.spotify.com/v1/artists`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        params: {
                            ids: artistChunk.join(','),  // Fetch the current chunk of artist IDs
                        },
                    });

                    artistsRes.data.artists.forEach(artist => {
                        artistBanners[artist.id] = artist.images[0]?.url || null;  // Store the artist banner by artistId
                    });
                }

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
                    albumTitle: track.track.album.name,
                    albumType: track.track.album.album_type,
                    albumCover: track.track.album.images[0]?.url || null,
                }));

                setPlaylistTracksArr(tracks);
            } catch (error) {
                console.error("Error fetching playlist content:", error);
            }
        };

        fetchPlaylist();
    }, [idPlaylist, accessToken, trackLimit, artistLimit, offset]);

    return { playlistTracksArr };
}

export default usePlaylistInfo;
