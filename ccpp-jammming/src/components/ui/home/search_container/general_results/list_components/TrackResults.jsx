import React, { useState, useEffect } from "react";
import Tracks from "./unit_components/Tracks";
import useFetchContent from "../../../../../../hooks/useFetchContent";

function TrackResults({ searchArtistResults, searchAlbumResults, searchTrackResults, onArtistClick, onAlbumClick, accessToken }) {
    const { artistContent, albumContent, trackContent, fetchMissingArtistByName, fetchMissingAlbumByName } = useFetchContent({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken });
    const [updatedArtistContent, setUpdatedArtistContent] = useState([]);
    const [updatedAlbumContent, setUpdatedAlbumContent] = useState([]);

    useEffect(() => {
        setUpdatedArtistContent(artistContent);
    }, [artistContent]);

    useEffect(() => {
        setUpdatedAlbumContent(albumContent);
    }, [albumContent]);

    return (
        <>
            <h4>tracks:</h4>
            {trackContent.filter((track, idx) => idx < 10).map(track => {
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
                    <Tracks 
                        trackContent={track}
                        artistContent={matchingArtist} 
                        albumContent={matchingAlbum} 
                        onArtistClick={onArtistClick}
                        onAlbumClick={onAlbumClick} 
                        key={track.trackUri} 
                    />
                );
            })}
        </>
    );
}

export default TrackResults;