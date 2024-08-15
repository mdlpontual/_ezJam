import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Artists from "./unit_components/Artists";

function ArtistResults({ artistsResults  }) {
    return (
        <>
            <h4>artists:</h4>
            {artistsResults.map(artist => (
                <Artists artist={artist} key={artist.uri}/>
            ))}
        </>
    );
}

export default ArtistResults;