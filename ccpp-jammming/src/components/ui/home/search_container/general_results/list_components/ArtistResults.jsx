import React from "react";
import Artists from "./unit_components/Artists";

function ArtistResults({ artistsResults, albumResults, songsResults, artistContent, albumContent, songContent, onArtistClick, onAlbumClick }) {
    return (
        <>
            <h4>artists:</h4>
            {artistsResults.filter((artist, idx) => idx < 5).map(artist => (
                <Artists 
                    artist={artist} 
                    albumResults={albumResults} 
                    songsResults={songsResults}
                    artistContent={artistContent} 
                    albumContent={albumContent} 
                    songContent={songContent} 
                    onArtistClick={onArtistClick}
                    onAlbumClick={onAlbumClick}
                    key={artist.uri}/>
            ))}
        </>
    );
}

export default ArtistResults;