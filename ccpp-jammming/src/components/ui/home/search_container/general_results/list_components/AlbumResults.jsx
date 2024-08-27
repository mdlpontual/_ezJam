import React from "react";
import Albuns from "./unit_components/Albuns";
import useFetchContent from "../../../../../../hooks/useFetchContent";

function AlbumResults({ searchArtistResults, searchAlbumResults, onArtistClick, onAlbumClick, accessToken }) {
    const { artistContent, albumContent } = useFetchContent({ searchArtistResults, searchAlbumResults, accessToken });

    return (
        <>
            <h4>albums:</h4>
            {albumContent.filter((album, idx) => idx < 5).map(album => {
                const matchingArtist = artistContent.find(artist => artist.artistName === album.albumAuthor);

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
