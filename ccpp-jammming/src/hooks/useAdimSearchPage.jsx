import React, { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import useResults from "./useResults";
import EmptyResultsPage from "../components/ui/home/search_container/non_results/EmptyResultsPage";
import GeneralResultsPage from "../components/ui/home/search_container/general_results/GeneralResultsPage";
import ArtistPage from "../components/ui/home/search_container/artist_page/ArtistPage";
import AlbumPage from "../components/ui/home/search_container/album_page/AlbumPage";

const emptyPage = <EmptyResultsPage />;

function useAdimSearchPage(search, code) {
    const [activePage, setActivePage] = useState(emptyPage);
    const [history, setHistory] = useState([emptyPage]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

    const { accessToken } = useAuth(code);
    const { searchArtistResults, searchAlbumResults, searchTrackResults } = useResults({search, accessToken});
    
    useEffect(() => {
        if (!search) {
            setActivePage(emptyPage);
        } else {
            const newPage = (
                <GeneralResultsPage
                    artistsResults={searchArtistResults}
                    albumResults={searchAlbumResults}
                    songsResults={searchTrackResults}
                    onArtistClick={() => handleArtistClick()}
                    onAlbumClick={() => handleAlbumClick()}
                />
            );
            setTimeout(() => updateHistory(newPage), 1500);
        }
    }, [search, searchArtistResults, searchAlbumResults, searchTrackResults]);

    /* const handleArtistClick = (artist) => {
        const newPage = <ArtistPage artist={artist} artistsResults={searchArtistResults} songsResults={searchTrackResults} />;
        updateHistory(newPage);
    }; */

    
    /* const handleAlbumClick = (album) => {
        const newPage = <AlbumPage album={album} albumResults={searchAlbumResults} songsResults={searchTrackResults} />;
        updateHistory(newPage);
    }; */

    /*
    State and Effect Management: The useEffect now handles switching between pages based on the search and results.
    Event Handlers: The GeneralResultsPage now takes onArtistClick and onAlbumClick props that update the activePage state when an artist or album is clicked.
    */

    const updateHistory = (newPage) => {
        const newHistory = history.slice(0, currentHistoryIndex + 1); // remove forward history if any
        newHistory.push(newPage); // add the new page to history
        setHistory(newHistory);
        setCurrentHistoryIndex(newHistory.length - 1); // update the index to the last item
        setActivePage(newPage);
    };

        // Async handler for artist click
        const handleArtistClick = async (artist) => {
            try {
                console.log("Artist clicked:", artist);
    
                // If you need to fetch additional artist data, you can do it here
                // const artistDetails = await fetchArtistDetails(artist.id);
    
                const newPage = (
                    <ArtistPage 
                        artist={artist} // or artistDetails if you fetch more data
                        artistsResults={searchArtistResults}
                        songsResults={searchTrackResults}
                    />
                );
                updateHistory(newPage);
            } catch (error) {
                console.error("Error in handleArtistClick:", error);
            }
        };
    
        // Async handler for album click
        const handleAlbumClick = async (album) => {
            try {
                console.log("Album clicked:", album);
    
                // If you need to fetch additional album data, you can do it here
                // const albumDetails = await fetchAlbumDetails(album.id);
    
                const newPage = (
                    <AlbumPage 
                        album={album} // or albumDetails if you fetch more data
                        albumResults={searchAlbumResults}
                        songsResults={searchTrackResults}
                    />
                );
                updateHistory(newPage);
            } catch (error) {
                console.error("Error in handleAlbumClick:", error);
            }
        };

    const goBack = () => {
        if (currentHistoryIndex > 0) {
            const newIndex = currentHistoryIndex - 1;
            setCurrentHistoryIndex(newIndex);
            setActivePage(history[newIndex]);
        }
    };

    const goForward = () => {
        if (currentHistoryIndex < history.length - 1) {
            const newIndex = currentHistoryIndex + 1;
            setCurrentHistoryIndex(newIndex);
            setActivePage(history[newIndex]);
        }
    };

    console.log("history:", history);
    console.log("history index:", currentHistoryIndex);
    

    return { activePage, goBack, goForward };
};

export default useAdimSearchPage;