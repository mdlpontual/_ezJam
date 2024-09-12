// src/contexts/TrackContext.js
import React, { createContext, useState, useContext } from 'react';

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
    const [currentTrackUri, setCurrentTrackUri] = useState(null);
    const [isPaused, setIsPaused] = useState(true);

    const updateCurrentTrackUri = (uri) => {
        setCurrentTrackUri(uri);
    };

    const togglePausePlay = (paused) => {
        setIsPaused(paused);
    };

    return (
        <TrackContext.Provider value={{ currentTrackUri, isPaused, updateCurrentTrackUri, togglePausePlay }}>
            {children}
        </TrackContext.Provider>
    );
};

export const useTrack = () => useContext(TrackContext);
