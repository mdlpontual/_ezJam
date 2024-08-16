import React, { useState, useEffect } from "react";
import EmptyResultsPage from "../components/ui/home/search_container/non_results/EmptyResultsPage";
import GeneralResultsPage from "../components/ui/home/search_container/general_results/GeneralResultsPage";
import ArtistPage from "../components/ui/home/search_container/artist_page/ArtistPage";
import AlbumPage from "../components/ui/home/search_container/album_page/AlbumPage";
import useResults from "./useResults";
import useAuth from "./useAuth";

function useAdimSearchPage(search, code) {
    const [activePage, setActivePage] = useState();
    const [history, setHistory] = useState([]);
    const { accessToken } = useAuth(code);
    const { searchArtistResults, searchAlbumResults, searchTrackResults } = useResults({search, accessToken})

    const emptyPage = <EmptyResultsPage />;
    const generalPage = <GeneralResultsPage artistsResults={searchArtistResults} albumResults={searchAlbumResults} songsResults={searchTrackResults}/>;
    const artistPage = <ArtistPage artistsResults={searchArtistResults} songsResults={searchTrackResults}/>;
    const albumPage = <AlbumPage albumResults={searchAlbumResults} songsResults={searchTrackResults}/>;

    const artistPageLink = document.getElementById("open-artist-page");
    const albumPageLink = document.getElementById("open-album-page");
    const backElement = document.getElementById("go-back");

    const renderComponent = (component) => {
        setHistory((prevHistory) => [...prevHistory, activePage]);
        setActivePage(component);
    };

    const goBack = () => {
        if (history.length > 0) {
            setActivePage(history[history.length - 1]);
            setHistory(history.slice(0, -1));
        }
    };

    const goEmptyPage = () => {setActivePage(emptyPage)}
    const goResultsPage = () => {setActivePage(generalPage)}
    const goToArtistPage = () => {setActivePage(artistPage)}
    const goToAlbumPage = () => {setActivePage(albumPage)}

    useEffect(() => {
        if (!search) {
            renderComponent(goEmptyPage);
        } else {
            renderComponent(goResultsPage);
        }
    }, [search]);

    useEffect(() => {
        if (artistPageLink) {
            artistPageLink.addEventListener("click", () =>{
                renderComponent(goToArtistPage);
            })
        }
        if (albumPageLink) {
            albumPageLink.addEventListener("click", () =>{
                renderComponent(goToAlbumPage);
            })
        }
        if (backElement) {
            backElement.addEventListener("click", () =>{
                renderComponent(goBack);
            })
        }
    }, [activePage]);

    return activePage;
};

export default useAdimSearchPage;