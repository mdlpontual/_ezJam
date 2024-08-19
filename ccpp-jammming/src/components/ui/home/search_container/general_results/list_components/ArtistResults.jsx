import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Artists from "./unit_components/Artists";

function ArtistResults({ artistsResults, onArtistClick }) {
    return (
        <>
            <h4>artists:</h4>
            {artistsResults.filter((artist, idx) => idx < 5).map(artist => (
                <Artists artist={artist} key={artist.uri} onArtistClick={onArtistClick}/>
            ))}
        </>
    );
}

export default ArtistResults;