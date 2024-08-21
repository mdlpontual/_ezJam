import React from "react";
import Songs from "./unit_components/Songs";

function SongResults({ songsResults, albumResults, artistsResults, onAlbumClick, onArtistClick }) {
    return (
        <>
            <h4>songs:</h4>
            {songsResults.filter((song, idx) => idx < 10).map(song => (
                <Songs song={song} album={albumResults} artist={artistsResults} onArtistClick={onArtistClick}  onAlbumClick={onAlbumClick} key={song.uri} />
            ))}
        </>
    );
}

export default SongResults;