import React, { useState, useEffect } from "react";
import TrackResultItem from "./unit_components/TrackResultItem";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";
import IMG from "../../../../../../assets/images/ImagesHUB";

function TrackResultsBox({ searchArtistResults, searchAlbumResults, 
                            searchTrackResults, onArtistClick, 
                            onAlbumClick, onPlayButton, playTrack, 
                            pauseTrack, userPlaylistsArr, urlSearch, accessToken }) {
                                
    const { fetchedArtistsArray, fetchedAlbumsArray, 
            fetchedTracksArray, fetchMissingArtistByName, 
            fetchMissingAlbumByName } = useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken });

    const [updatedArtistContent, setUpdatedArtistContent] = useState([]);
    const [updatedAlbumContent, setUpdatedAlbumContent] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
    const [isShiftSelecting, setIsShiftSelecting] = useState(false);

    console.log("tracks")

    useEffect(() => {
        setUpdatedArtistContent(fetchedArtistsArray);
    }, [fetchedArtistsArray]);

    useEffect(() => {
        setUpdatedAlbumContent(fetchedAlbumsArray);
    }, [fetchedAlbumsArray]);

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const handleTrackClick = (uriTrack, index, event) => {
        const isCtrlOrCmdPressed = event.metaKey || event.ctrlKey;
        const isShiftPressed = event.shiftKey;

        setSelectedTracks((prevSelected) => {
            if (isShiftPressed && lastSelectedIndex !== null) {
                const start = Math.min(lastSelectedIndex, index);
                const end = Math.max(lastSelectedIndex, index);
                const range = fetchedTracksArray.slice(start, end + 1).map(track => track.trackUri);
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
        const container = document.getElementById("open-tracks-results-container");
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
            <div id="open-tracks-results-container" 
                    className={`container-fluid d-flex flex-column ${isShiftSelecting ? 'no-text-select' : ''}`}  
                    onMouseDown={handleMouseDown} 
                    onMouseUp={handleMouseUp}>
                <div id="track-box-title" className="container-fluid d-flex justify-content-between align-items-center">
                    <h4>Tracks:</h4>
                    <a title="Open Spotify" id="white-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/search/${urlSearch}`} target="_blank" rel="noopener noreferrer">
                        <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIconWhite} width="30px"/> Open Spotify</p>
                    </a>
                    <a title="Open Spotify" id="green-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/search/${urlSearch}`} target="_blank" rel="noopener noreferrer">
                        <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIcon} width="30px"/> Open Spotify</p>
                    </a>
                </div>
                {fetchedTracksArray.filter((track, idx) => idx < 10).map(track => {
                    let matchingArtist = updatedArtistContent.find(artist => artist.artistName === track.trackAuthor);
                    let matchingAlbum = updatedAlbumContent.find(album => album.albumTitle === track.trackAlbum);
/* 
                    // If matchingArtist is not found, trigger a fetch
                    if (!matchingArtist) {
                        fetchMissingArtistByName(track.trackAuthor).then(newArtist => {
                            if (newArtist) {
                                setUpdatedArtistContent(prevContent => [...prevContent, newArtist]);
                            }
                        });
                    }

                    if (!matchingAlbum) {
                        fetchMissingAlbumByName(track.trackAlbum).then(newAlbum => {
                            if (newAlbum) {
                                setUpdatedAlbumContent(prevContent => [...prevContent, newAlbum]);
                            }
                        });
                    } */

                    return (
                        <TrackResultItem 
                            trackContent={track}
                            artistContent={matchingArtist} 
                            albumContent={matchingAlbum} 
                            fetchedTracksArray={fetchedTracksArray}
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick} 
                            onPlayButton={onPlayButton}
                            playTrack={playTrack}
                            pauseTrack={pauseTrack}
                            accessToken={accessToken}
                            key={track.trackUri}
                            onTrackClick={(event) => handleTrackClick(track.trackUri, fetchedTracksArray.indexOf(track), event)}
                            isSelected={selectedTracks.includes(track.trackUri)}
                            userPlaylistsArr={userPlaylistsArr}
                            selectedTracks={selectedTracks} 
                        />
                    );
                })}
            </div>
        </>
    );
}

export default TrackResultsBox;