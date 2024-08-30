import React, { useEffect, useState } from "react";
import AlbumResultItem from "./unit_components/AlbumResultItem";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";

function AlbumResultsBox({ searchArtistResults, searchAlbumResults, searchTrackResults, onArtistClick, onAlbumClick, onPlayButton, accessToken }) {
    const { fetchedArtistsArray,  fetchedAlbumsArray, fetchedTracksArray, fetchMissingArtistByName } = useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken });
    const [updatedArtistContent, setUpdatedArtistContent] = useState([]);

    useEffect(() => {
        setUpdatedArtistContent(fetchedArtistsArray);
    }, [fetchedArtistsArray]);

    return (
        <>
            <h4>albums:</h4>
            { fetchedAlbumsArray.filter((album, idx) => idx < 5).map(album => {
                let matchingArtist = updatedArtistContent.find(artist => artist.artistName === album.albumAuthor);

                // If matchingArtist is not found, trigger a fetch
                if (!matchingArtist) {
                    fetchMissingArtistByName(album.albumAuthor).then(newArtist => {
                        if (newArtist) {
                            setUpdatedArtistContent(prevContent => [...prevContent, newArtist]);
                        }
                    });
                }

                return (
                    <AlbumResultItem 
                        albumContent={album}
                        artistContent={matchingArtist} 
                        fetchedArtistsArray={fetchedArtistsArray}
                        fetchedTracksArray={fetchedTracksArray}
                        onArtistClick={onArtistClick}
                        onAlbumClick={onAlbumClick} 
                        onPlayButton={onPlayButton}
                        accessToken={accessToken}
                        key={album.albumUri}
                    />
                );
            })}
        </>
    );
}

export default AlbumResultsBox;