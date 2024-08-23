import React from "react";
import Albuns from "./unit_components/Albuns";

function AlbumResults({ searchArtistResults, searchAlbumResults, searchTrackResults, artistContent, albumContent, songContent, onArtistClick, onAlbumClick }) {
    return (
        <>
            <h4>albuns:</h4>
            {searchAlbumResults.filter((album, idx) => idx < 5).map(album => (
                <Albuns 
                    searchArtistResults={searchArtistResults}
                    searchAlbumResults={album}
                    searchTrackResults={searchTrackResults}
                    artistContent={artistContent} 
                    albumContent={albumContent} 
                    songContent={songContent} 
                    onArtistClick={onArtistClick}
                    onAlbumClick={onAlbumClick} 
                    key={album.uri}/>
            ))}
        </>
    );
}

export default AlbumResults;