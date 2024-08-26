import React, { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import useSearchResults from "./useSearchResults";
import useFetchedContent from "./useFetchedContent";
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
    const { searchArtistResults, searchAlbumResults, searchTrackResults } = useSearchResults({ search, accessToken });
    
    const { artistContent, albumContent, songContent } = useFetchedContent({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken });

    // Debounced function for setting the page
    const debouncedSetPage = useCallback(debounce((newPage) => {
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);
    }, 500), []);

    useEffect(() => {
        if (!search) {
            setActivePage(emptyPage);
            setIsHistoryUpdateNeeded(false);  // No need to update history if no search
        } else {
            const newPage = (
                <GeneralResultsPage
                    searchArtistResults={searchArtistResults}
                    searchAlbumResults={searchAlbumResults}
                    searchTrackResults={searchTrackResults}
                    artistContent={artistContent}
                    albumContent={albumContent}
                    songContent={songContent}
                    onArtistClick={handleArtistClick}
                    onAlbumClick={handleAlbumClick}
                />
            );

            debouncedSetPage(newPage);  // Use the debounced function for page updates
        }
    }, [search, artistContent, albumContent, songContent, searchArtistResults, searchAlbumResults, searchTrackResults, debouncedSetPage]);



    
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

    const handleArtistClick = useCallback(( artistContent, albumContent, songContent, searchArtistResults, searchAlbumResults, searchTrackResults ) => {
        const newPage = (
            <ArtistPage 
                artistContent={artistContent} 
                albumContent={albumContent} 
                songContent={songContent}
                searchArtistResults={searchArtistResults}
                searchAlbumResults={searchAlbumResults}
                searchTrackResults={searchTrackResults}/>
        );
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);  // Flag to update history when page changes
    }, [ artistContent, albumContent, songContent, searchArtistResults, searchAlbumResults, searchTrackResults ]);
    
    const handleAlbumClick = useCallback(( artistContent, albumContent, songContent, searchArtistResults, searchAlbumResults, searchTrackResults ) => {
        const newPage = (
            <AlbumPage 
                artistContent={artistContent} 
                albumContent={albumContent} 
                songContent={songContent}
                searchArtistResults={searchArtistResults}
                searchAlbumResults={searchAlbumResults}
                searchTrackResults={searchTrackResults}/>
        );
        setActivePage(newPage);
        setIsHistoryUpdateNeeded(true);  // Flag to update history when page changes
    }, [ artistContent, albumContent, songContent, searchArtistResults, searchAlbumResults, searchTrackResults ]);




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

    return { activePage, goBack, goForward };
}

export default useAdimSearchPage;