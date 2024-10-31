import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";

const AddTrackContext = createContext();

export const AddTrackProvider = ({ children }) => {
    const [trackUriToAdd, setTrackUriToAdd] = useState(null);
    const [trackIdToAdd, setTrackIdToAdd] = useState([]);
    const [playlistToAddTrack, setPlaylistToAddTrack] = useState({});
    const [trackToAddContent, setTrackToAddContent] = useState([]);
    const [token, setToken] = useState(null);

    console.log("trackToAddContent", trackToAddContent)
    console.log("trackIdToAdd", trackIdToAdd)

    const updateTrackToAdd = (uriTrack, idTrack, playlistData, accessToken) => {
        setTrackUriToAdd(uriTrack);
        setTrackIdToAdd(Array.isArray(idTrack) ? idTrack : [idTrack]); // Ensure idTrack is always an array
        setPlaylistToAddTrack(playlistData);
        setToken(accessToken);
        console.log("AddTrackProvider selectedTracksIds", idTrack);
    };
    
    useEffect(() => {
        const fetchTrack = async () => {
            if (!trackIdToAdd || !token) return;
    
            try {
                if (trackIdToAdd.length === 1) {
                    // Fetch a single track using the first (and only) ID in the array
                    const res = await axios.get(`https://api.spotify.com/v1/tracks/${trackIdToAdd[0]}`, {
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
                        artistBanner: null,
                        albumId: trackData.album.id || null,
                        albumTitle: trackData.album.name,
                        albumType: trackData.album.album_type,
                        albumCover: trackData.album.images[0]?.url || null,
                    };
    
                    // Wrap the single track in an array for consistent state updates
                    setTrackToAddContent([track]);
    
                } else {
                    // Multiple track case
                    const trackPromises = trackIdToAdd.map(async (trackId) => {
                        const res = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
    
                        const trackData = res.data;
    
                        return {
                            trackId: trackData.id,
                            trackTitle: trackData.name,
                            trackAuthor: trackData.artists[0]?.name || "Unknown Artist",
                            trackAlbum: trackData.album.name,
                            trackCover: trackData.album.images[trackData.album.images.length - 1]?.url || null,
                            trackUri: trackData.uri,
                            trackDuration: trackData.duration_ms,
                            artistId: trackData.artists[0]?.id || null,
                            artistName: trackData.artists[0]?.name || "Unknown Artist",
                            artistBanner: null,
                            albumId: trackData.album.id || null,
                            albumTitle: trackData.album.name,
                            albumType: trackData.album.album_type,
                            albumCover: trackData.album.images[0]?.url || null,
                        };
                    });
    
                    const fetchedTracks = await Promise.all(trackPromises);
                    setTrackToAddContent(fetchedTracks);
                }
            } catch (error) {
                console.error("Error fetching track content:", error);
            }
        };
    
        //setTrackIdToAdd()
        fetchTrack();
    }, [trackIdToAdd, token]);    

    return (
        <AddTrackContext.Provider value={{ 
                updateTrackToAdd, 
                playlistToAddTrack, 
                trackToAddContent, 
                setPlaylistToAddTrack, 
                setTrackToAddContent}}>
            {children}
        </AddTrackContext.Provider>
    );
};

export const useAddTrack = () => useContext(AddTrackContext);