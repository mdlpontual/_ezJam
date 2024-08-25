import React from "react";
import Artists from "./unit_components/Artists";

function ArtistResults({ searchArtistResults, searchAlbumResults, searchTrackResults, artistContent, albumContent, songContent, onArtistClick, onAlbumClick }) {
    return (
        <>
            <h4>artists:</h4>
            {searchArtistResults.filter((artist, idx) => idx < 5).map(artist => (
                <Artists 
                    searchArtistResults={artist}
                    searchAlbumResults={searchAlbumResults}
                    searchTrackResults={searchTrackResults}
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