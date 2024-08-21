import React from "react";
import Albuns from "./unit_components/Albuns";

function AlbumResults({ albumResults, artistsResults, onAlbumClick, onArtistClick }) {
    return (
        <>
            <h4>albuns:</h4>
            {albumResults.filter((album, idx) => idx < 5).map(album => (
                <Albuns 
                    album={album} 
                    artist={artistsResults} 
                    onAlbumClick={onAlbumClick} 
                    onArtistClick={onArtistClick} 
                    key={album.uri}/>
            ))}
        </>
    );
}

export default AlbumResults;