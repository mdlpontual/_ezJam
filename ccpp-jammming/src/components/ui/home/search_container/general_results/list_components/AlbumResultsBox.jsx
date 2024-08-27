import React, { useEffect, useState } from "react";
import AlbumResultItem from "./unit_components/AlbumResultItem";
import useFetchContent from "../../../../../../hooks/useFetchContent";

function AlbumResultsBox({ searchArtistResults, searchAlbumResults, onArtistClick, onAlbumClick, accessToken }) {
    const { fetchedArtistsArray,  fetchedAlbumsArray, fetchMissingArtistByName } = useFetchContent({ searchArtistResults, searchAlbumResults, accessToken });
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
                        onArtistClick={onArtistClick}
                        onAlbumClick={onAlbumClick} 
                        key={album.albumUri}
                    />
                );
            })}
        </>
    );
}

export default AlbumResultsBox;