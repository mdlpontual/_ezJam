import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";

const AddTrackContext = createContext();

export const AddTrackProvider = ({ children }) => {
    const [trackUriToAdd, setTrackUriToAdd] = useState(null);
    const [trackIdToAdd, setTrackIdToAdd] = useState(null);
    const [playlistToAddTrack, setPlaylistToAddTrack] = useState({});
    const [trackToAddContent, setTrackToAddContent] = useState({});
    const [token, setToken] = useState(null);


    const updateTrackToAdd = (uriTrack, idTrack, playlist, accessToken) => {
        setTrackUriToAdd(uriTrack);
        setTrackIdToAdd(idTrack);
        setPlaylistToAddTrack(playlist);
        setToken(accessToken);
    };

    useEffect(() => {
        const fetchTrack = async () => {
            if (!trackIdToAdd || !token) return;
        
            try {
                const res = await axios.get(`https://api.spotify.com/v1/tracks/${trackIdToAdd}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                const trackData = res.data;
        
                const track = {
                    trackId: trackData.id,
                    trackTitle: trackData.name,
                    trackAuthor: trackData.artists[0]?.name || "Unknown Artist",
                    trackAlbum: trackData.album.name,
                    trackCover: trackData.album.images[trackData.album.images.length - 1]?.url || null,
                    trackUri: trackData.uri,
                    trackDuration: trackData.duration_ms,
                    artistId: trackData.artists[0]?.id || null,
                    artistName: trackData.artists[0]?.name || "Unknown Artist",
                    artistBanner: null, // Set this to whatever you need
                    albumId: trackData.album.id || null,
                    albumTitle: trackData.album.name,
                    albumType: trackData.album.album_type,
                    albumCover: trackData.album.images[0]?.url || null,
                };
        
                setTrackToAddContent(track);
            } catch (error) {
                console.error("Error fetching track content:", error);
            }
        };

        fetchTrack();
    }, [trackIdToAdd, token]);

    return (
        <AddTrackContext.Provider value={{ updateTrackToAdd, trackUriToAdd, trackIdToAdd, playlistToAddTrack, trackToAddContent, token }}>
            {children}
        </AddTrackContext.Provider>
    );
};

export const useAddTrack = () => useContext(AddTrackContext); 