import React, { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import useResults from "./useResults";
import EmptyResultsPage from "../components/ui/home/search_container/non_results/EmptyResultsPage";
import GeneralResultsPage from "../components/ui/home/search_container/general_results/GeneralResultsPage";
import ArtistPage from "../components/ui/home/search_container/artist_page/ArtistPage";
import AlbumPage from "../components/ui/home/search_container/album_page/AlbumPage";

const emptyPage = <EmptyResultsPage />;

// Debounce function
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

function useAdimSearchPage(search, code) {
    const [activePage, setActivePage] = useState(emptyPage);
    const [history, setHistory] = useState([emptyPage]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
    const [isHistoryUpdateNeeded, setIsHistoryUpdateNeeded] = useState(false);  // New state to control history updates

    const { accessToken } = useAuth(code);
    const { searchArtistResults, searchAlbumResults, searchTrackResults } = useResults({ search, accessToken });

    // Debounced function for setting the page
    const debouncedSetPage = useCallback(debounce((newPage) => {
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);
    }, 750), []);

    useEffect(() => {
        if (!search) {
            setActivePage(emptyPage);
            setIsHistoryUpdateNeeded(false);  // No need to update history if no search
        } else {
            const newPage = (
                <GeneralResultsPage
                    artistsResults={searchArtistResults}
                    albumResults={searchAlbumResults}
                    songsResults={searchTrackResults}
                    onArtistClick={handleArtistClick}
                    onAlbumClick={handleAlbumClick}
                />
            );

            debouncedSetPage(newPage);  // Use the debounced function for page updates
        }
    }, [search, searchArtistResults, searchAlbumResults, searchTrackResults, debouncedSetPage]);

    useEffect(() => {
        if (isHistoryUpdateNeeded) {
            updateHistory(activePage);
            setIsHistoryUpdateNeeded(false);  // Reset flag after history update
        }
    }, [activePage, isHistoryUpdateNeeded]);

    const updateHistory = useCallback((newPage) => {
        setHistory((prevHistory) => {
            const newHistory = prevHistory.slice(0, currentHistoryIndex + 1);
            newHistory.push(newPage);
            return newHistory;
        });

        setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
    }, [currentHistoryIndex]);

    const handleArtistClick = useCallback((artist) => {
        const newPage = (
            <ArtistPage
                artist={artist}
                artistsResults={searchArtistResults}
                songsResults={searchTrackResults}
            />
        );
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);  // Flag to update history when page changes
    }, [searchArtistResults, searchTrackResults]);

    const handleAlbumClick = useCallback((album) => {
        const newPage = (
            <AlbumPage
                album={album}
                albumResults={searchAlbumResults}
                songsResults={searchTrackResults}
            />
        );
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);  // Flag to update history when page changes
    }, [searchAlbumResults, searchTrackResults]);

    const goBack = useCallback(() => {
        if (currentHistoryIndex > 0) {
            setCurrentHistoryIndex((prevIndex) => prevIndex - 1);
            setActivePage(history[currentHistoryIndex - 1]);
        }
    }, [currentHistoryIndex, history]);

    const goForward = useCallback(() => {
        if (currentHistoryIndex < history.length - 1) {
            setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
            setActivePage(history[currentHistoryIndex + 1]);
        }
    }, [currentHistoryIndex, history]);

    /* console.log("history:", history);
    console.log("history index:", currentHistoryIndex); */

    return { activePage, goBack, goForward };
}

export default useAdimSearchPage;