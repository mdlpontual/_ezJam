import React, { createContext, useContext, useState } from 'react';

// Create a context for managing the saved state of playlists
const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
    const [savedState, setSavedState] = useState({}); // Object to store saved status per playlist ID

    // Function to get the saved state of a specific playlist by ID
    const getIsSaved = (playlistId) => {
        return savedState[playlistId] ?? true; // Default to true (saved) if no entry exists
    };

    // Function to set the saved state of a specific playlist by ID
    const setIsSaved = (playlistId, isSaved) => {
        // Only update the state if the value is actually different
        setSavedState((prevState) => {
            if (prevState[playlistId] === isSaved) {
                return prevState; // No change needed, return previous state to avoid re-render
            }
            return {
                ...prevState,
                [playlistId]: isSaved, // Update only the specific playlist's saved status
            };
        });
    };

    return (
        <SaveContext.Provider value={{ getIsSaved, setIsSaved }}>
            {children}
        </SaveContext.Provider>
    );
};

// Custom hook to use the SaveContext
export const useSave = () => {
    return useContext(SaveContext);
};