import React, { useEffect, useState } from "react";
import Albuns from "./unit_components/Albuns";
import useFetchContent from "../../../../../../hooks/useFetchContent";

function AlbumResults({ searchArtistResults, searchAlbumResults, onArtistClick, onAlbumClick, accessToken }) {
    const { artistContent, albumContent, fetchMissingArtistByName } = useFetchContent({ searchArtistResults, searchAlbumResults, accessToken });
    const [updatedArtistContent, setUpdatedArtistContent] = useState([]);

    useEffect(() => {
        setUpdatedArtistContent(artistContent);
    }, [artistContent]);

    return (
        <>
            <h4>albums:</h4>
            {albumContent.filter((album, idx) => idx < 5).map(album => {
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
                    <Albuns 
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

export default AlbumResults;