import React from "react";
import Artists from "./unit_components/Artists";

function ArtistResults({ artistsResults, onArtistClick }) {
    return (
        <>
            <h4>artists:</h4>
            {artistsResults.filter((artist, idx) => idx < 5).map(artist => (
                <Artists artist={artist} onArtistClick={onArtistClick} key={artist.uri}/>
            ))}
        </>
    );
}

export default ArtistResults;