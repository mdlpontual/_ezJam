import React, { useState, useEffect, useCallback, useMemo } from "react";
import useFetchId from "./useFetchId";
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

function useAdimSearchPage(search, onPlayButton, accessToken) {
    const [activePage, setActivePage] = useState(emptyPage);
    const [history, setHistory] = useState([emptyPage]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
    const [isHistoryUpdateNeeded, setIsHistoryUpdateNeeded] = useState(false);

    const { searchArtistResults, searchAlbumResults, searchTrackResults } = useFetchId({ search, accessToken });

    // Memoize the fetched results so they don't change unless the search query changes
    const cachedResults = useMemo(() => {
        return {
            artists: searchArtistResults,
            albums: searchAlbumResults,
            tracks: searchTrackResults
        };
    }, [search, searchArtistResults, searchAlbumResults, searchTrackResults]);

    // Debounced function for setting the page
    const debouncedSetPage = useCallback(debounce((newPage) => {
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);
    }, 1000), []);

    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if (!search) {
            setActivePage(emptyPage);
            setIsHistoryUpdateNeeded(false);
        } else {
            const newPage = (
                <GeneralResultsPage
                    searchArtistResults={cachedResults.artists}
                    searchAlbumResults={cachedResults.albums}
                    searchTrackResults={cachedResults.tracks}
                    onArtistClick={handleArtistClick}
                    onAlbumClick={handleAlbumClick}
                    onPlayButton={onPlayButton}
                    accessToken={accessToken}
                />
            );

            debouncedSetPage(newPage);
        }
    }, [search, cachedResults, debouncedSetPage, accessToken]);

    useEffect(() => {
        if (isHistoryUpdateNeeded) {
            updateHistory(activePage);
            setIsHistoryUpdateNeeded(false);
        }
    }, [activePage, isHistoryUpdateNeeded]);

    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------

    const updateHistory = useCallback((newPage) => {
        setHistory((prevHistory) => {
            const newHistory = prevHistory.slice(0, currentHistoryIndex + 1);
            newHistory.push(newPage);
            return newHistory;
        });

        setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
    }, [currentHistoryIndex]);

    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------

    const handleArtistClick = useCallback((artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken) => {
        const newPage = (
            <ArtistPage 
                artistContent={artistContent} 
                onArtistClick={onArtistClick}
                onAlbumClick={onAlbumClick} 
                onPlayButton={onPlayButton}
                accessToken={accessToken}/>
        );
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);
    }, []);

    //--------------------------------------------------------------

    const handleAlbumClick = useCallback((albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken) => {
        const newPage = (
            <AlbumPage 
                albumContent={albumContent} 
                onArtistClick={onArtistClick}
                onAlbumClick={onAlbumClick} 
                onPlayButton={onPlayButton}
                accessToken={accessToken}/>
        );
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);
    }, []);

    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------

    const goBack = useCallback(() => {
        if (currentHistoryIndex > 0) {
            setCurrentHistoryIndex((prevIndex) => prevIndex - 1);
            setActivePage(history[currentHistoryIndex - 1]);
        }
    }, [currentHistoryIndex, history]);

    //--------------------------------------------------------------

    const goForward = useCallback(() => {
        if (currentHistoryIndex < history.length - 1) {
            setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
            setActivePage(history[currentHistoryIndex + 1]);
        }
    }, [currentHistoryIndex, history]);

    return { activePage, goBack, goForward };
}

export default useAdimSearchPage;