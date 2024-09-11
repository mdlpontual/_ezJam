// src/contexts/TrackContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the TrackContext
const TrackContext = createContext();

// Create a provider component
export const TrackProvider = ({ children }) => {
  const [currentTrackUri, setCurrentTrackUri] = useState(null);

  const updateCurrentTrackUri = (uri) => {
    setCurrentTrackUri(uri);
  };

  return (
    <TrackContext.Provider value={{ currentTrackUri, updateCurrentTrackUri }}>
      {children}
    </TrackContext.Provider>
  );
};

// Custom hook to use the TrackContext in any component
export const useTrack = () => useContext(TrackContext);