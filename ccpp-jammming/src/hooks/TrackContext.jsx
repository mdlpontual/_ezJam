// src/contexts/TrackContext.js
import React, { createContext, useState, useContext } from 'react';

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
    const [currentTrackUri, setCurrentTrackUri] = useState(null);
    const [currentTrackTitle, setCurrentTrackTitle] = useState(null);
    const [currentTrackArtist, setCurrentTrackArtist] = useState(null);
    const [currentTrackAlbum, setCurrentTrackAlbum] = useState(null);
    const [currentQueueUri, setCurrentQueueUri] = useState(null);
    const [isPaused, setIsPaused] = useState(true);

    const updateCurrentTrackUri = (uri) => {
        setCurrentTrackUri(uri);
    };

    const updateCurrentTrackTitle = (name) => {
        setCurrentTrackTitle(name);
    };

    const updateCurrentTrackArtist = (artist) => {
        setCurrentTrackArtist(artist);
    };

    const updateCurrentTrackAlbum = (album) => {
        setCurrentTrackAlbum(album);
    };

    const updateCurrentQueueUri = (uriQueue) => {
        setCurrentQueueUri(uriQueue);
    };

    const togglePausePlay = (paused) => {
        setIsPaused(paused);
    };

    return (
        <TrackContext.Provider value={{ 
            currentTrackUri, 
            currentTrackTitle,
            currentTrackArtist,
            currentTrackAlbum,
            currentQueueUri,
            isPaused, 
            updateCurrentTrackUri, 
            updateCurrentTrackTitle, 
            updateCurrentTrackArtist,
            updateCurrentTrackAlbum,
            updateCurrentQueueUri,
            togglePausePlay }}>

            {children}
        </TrackContext.Provider>
    );
};

export const useTrack = () => useContext(TrackContext);