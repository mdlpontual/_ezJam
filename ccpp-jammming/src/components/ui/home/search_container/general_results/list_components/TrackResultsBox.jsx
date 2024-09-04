import React, { useState, useEffect } from "react";
import TrackResultItem from "./unit_components/TrackResultItem";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";

function TrackResultsBox({ searchArtistResults, searchAlbumResults, searchTrackResults, onArtistClick, onAlbumClick, onPlayButton, accessToken }) {
    const { fetchedArtistsArray, fetchedAlbumsArray, fetchedTracksArray, fetchMissingArtistByName, fetchMissingAlbumByName } = useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken });
    const [updatedArtistContent, setUpdatedArtistContent] = useState([]);
    const [updatedAlbumContent, setUpdatedAlbumContent] = useState([]);

    useEffect(() => {
        setUpdatedArtistContent(fetchedArtistsArray);
    }, [fetchedArtistsArray]);

    useEffect(() => {
        setUpdatedAlbumContent(fetchedAlbumsArray);
    }, [fetchedAlbumsArray]);

    return (
        <>
            <h4>tracks:</h4>
            {fetchedTracksArray.filter((track, idx) => idx < 10).map(track => {
                let matchingArtist = updatedArtistContent.find(artist => artist.artistName === track.trackAuthor);
                let matchingAlbum = updatedAlbumContent.find(album => album.albumTitle === track.trackAlbum);

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
                }

                return (
                    <TrackResultItem 
                        trackContent={track}
                        artistContent={matchingArtist} 
                        albumContent={matchingAlbum} 
                        onArtistClick={onArtistClick}
                        onAlbumClick={onAlbumClick} 
                        onPlayButton={onPlayButton}
                        accessToken={accessToken}
                        key={track.trackUri} 
                    />
                );
            })}
        </>
    );
}

export default TrackResultsBox;