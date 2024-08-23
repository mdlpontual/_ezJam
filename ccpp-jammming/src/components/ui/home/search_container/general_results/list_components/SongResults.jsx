import React from "react";
import Songs from "./unit_components/Songs";

function SongResults({ searchArtistResults, searchAlbumResults, searchTrackResults, artistContent, albumContent, songContent, onArtistClick, onAlbumClick }) {
    return (
        <>
            <h4>songs:</h4>
            {searchTrackResults.filter((song, idx) => idx < 10).map(song => (
                <Songs 
                    searchArtistResults={searchArtistResults}
                    searchAlbumResults={searchAlbumResults}
                    searchTrackResults={song}
                    artistContent={artistContent} 
                    albumContent={albumContent} 
                    songContent={songContent} 
                    onArtistClick={onArtistClick}
                    onAlbumClick={onAlbumClick} 
                    key={song.uri} />
            ))}
        </>
    );
}

export default SongResults;