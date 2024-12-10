import React, { useState, useEffect } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import AlbumTracks from "./AlbumTracks";
import useFetchContent from "../../../../../hooks/useFetchContent";

function AlbumPage({ albumContent, onArtistClick, onAlbumClick, onPlayButton, playTrack, pauseTrack, userPlaylistsArr, accessToken }) {
    const idAlbum = albumContent.albumId;
    const { fetchedAlbumTracksArray } = useFetchContent({ idAlbum, accessToken });
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
    const [isShiftSelecting, setIsShiftSelecting] = useState(false);

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const handleTrackClick = (uriTrack, index, event) => {
        const isCtrlOrCmdPressed = event.metaKey || event.ctrlKey;
        const isShiftPressed = event.shiftKey;

        setSelectedTracks((prevSelected) => {
            if (isShiftPressed && lastSelectedIndex !== null) {
                const start = Math.min(lastSelectedIndex, index);
                const end = Math.max(lastSelectedIndex, index);
                const range = fetchedAlbumTracksArray.slice(start, end + 1).map(track => track.trackUri);
                return Array.from(new Set([...prevSelected, ...range]));
            } else if (isCtrlOrCmdPressed) {
                return prevSelected.includes(uriTrack)
                    ? prevSelected.filter(track => track !== uriTrack)
                    : [...prevSelected, uriTrack];
            } else {
                setLastSelectedIndex(index);
                return prevSelected.includes(uriTrack) ? [] : [uriTrack];
            }
        });
        
    };

    const handleMouseDown = (event) => {
        if (event.shiftKey) setIsShiftSelecting(true);
    };

    const handleMouseUp = () => setIsShiftSelecting(false);


    const handleOutsideClick = (event) => {
        const container = document.getElementById("album-page-container");
        if (!container.contains(event.target)) setSelectedTracks([]);
    };
    
    const handleKeyDown = (event) => {
        if (event.key === "Escape") setSelectedTracks([]); // Clears all selected tracks
    };
    
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div id="album-page-container" 
                className={`container-fluid d-flex flex-column ${isShiftSelecting ? 'no-text-select' : ''}`}  
                onMouseDown={handleMouseDown} 
                onMouseUp={handleMouseUp}
            >
                <div id="album-page-banner-row" className="row">
                    <div id="album-page-banner-col" className="col">
                        <div id="album-inner-banner-row" className="row justify-content-center align-items-center">
                            <div id="album-cover-col" className="col-auto justify-content-center align-items-center">
                                <img title={albumContent.albumTitle} src={albumContent.albumCover} alt="album cover" height="115px"/>
                            </div>
                            <div id="album-title-col" className="col flex-column justify-content-end align-items-start">
                                <div id="type-sptf" className="row justify-content-between align-items-end">
                                    <h5 className="col d-none d-md-flex">{albumContent.albumType}</h5>
                                    <a className="col" title="Open Spotify" id="white-logo" href={`https://open.spotify.com/album/${idAlbum}`}  target="_blank" rel="noopener noreferrer">
                                        <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIconWhite} width="25px"/> Open Spotify</p>
                                    </a>
                                    <a className="col" title="Open Spotify" id="green-logo" href={`https://open.spotify.com/album/${idAlbum}`}  target="_blank" rel="noopener noreferrer">
                                        <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIcon} width="25px"/> Open Spotify</p>
                                    </a>
                                </div>
                                <h1 title={albumContent.albumTitle}>{albumContent.albumTitle}</h1>
                                <h5 title={albumContent.albumAuthor}>by {albumContent.albumAuthor}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="album-page-songs-row" className="row">
                    <div id="album-page-songs-col" className="col">
                        <div id="top-labels" className="row">
                            <div id="col-num" className="col-1 d-flex justify-content-center align-items-end">
                                #
                            </div>
                            <div id="col-cover" className="col-1 d-flex justify-content-start align-items-end">

                            </div>
                            <div id="col-title" className="col d-flex justify-content-start align-items-end">
                                title
                            </div>
                            <div id="col-artist" className="col-2 d-flex justify-content-start align-items-center">

                            </div>
                            <div id="col-duration" className="col-1 d-flex justify-content-center align-items-end d-none d-md-flex">
                                <img src={IMG.clockPNG} alt="clock icon" height="15px"/>
                            </div>
                            <div id="col-cover" className="col-1 d-flex justify-content-start align-items-end">

                            </div>
                        </div>
                        <div id="tracks-list" className="row flex-grow-1">
                            <div id="tracks-list-col" className="col">
                                {fetchedAlbumTracksArray.map(track => (
                                    <AlbumTracks 
                                        trackContent={track} 
                                        fetchedAlbumTracksArray={fetchedAlbumTracksArray}
                                        onArtistClick={onArtistClick}
                                        onAlbumClick={onAlbumClick} 
                                        onPlayButton={onPlayButton}
                                        playTrack={playTrack}
                                        pauseTrack={pauseTrack}
                                        userPlaylistsArr={userPlaylistsArr}
                                        accessToken={accessToken} 
                                        key={track.trackUri}
                                        onTrackClick={(event) => handleTrackClick(track.trackUri, fetchedAlbumTracksArray.indexOf(track), event)}
                                        isSelected={selectedTracks.includes(track.trackUri)}
                                        selectedTracks={selectedTracks}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlbumPage;