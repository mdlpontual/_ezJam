import React from "react";
import ArtistResultItem from "./unit_components/ArtistResultItem";
import useFetchContent from "../../../../../../hooks/useFetchContent";

function ArtistResultsBox({ searchArtistResults, searchAlbumResults, searchTrackResults, onArtistClick, onAlbumClick, accessToken }) {
    const { fetchedArtistsArray } = useFetchContent({ searchArtistResults, accessToken })

    return (
        <>
            <h4>artists:</h4>
            {fetchedArtistsArray.filter((artist, idx) => idx < 5).map(artist => (
                <ArtistResultItem 
                    artistContent={artist}
                    onArtistClick={onArtistClick}
                    key={artist.artistUri}/>
            ))}
        </>
    );
}

export default ArtistResultsBox;