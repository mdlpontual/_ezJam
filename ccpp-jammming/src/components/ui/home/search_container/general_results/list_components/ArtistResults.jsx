import React from "react";
import Artists from "./unit_components/Artists";
import useFetchContent from "../../../../../../hooks/useFetchContent";

function ArtistResults({ searchArtistResults, onArtistClick, accessToken }) {
    const { artistContent } = useFetchContent({ searchArtistResults, accessToken })

    console.log("ArtistResults", artistContent);

    return (
        <>
            <h4>artists:</h4>
            {artistContent.filter((artist, idx) => idx < 5).map((artist, idx) => (
                <Artists 
                    artistContent={artist}
                    onArtistClick={onArtistClick}
                    key={artist.artistUriResponse}/>
            ))}
        </>
    );
}

export default ArtistResults;