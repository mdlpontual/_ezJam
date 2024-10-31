import React from "react";
import Album from "./unit_components/Album";

function DiscographyBox({ fetchedArtistDiscographyArray, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken }) {
    return (
        <>
            <div id="discography-container" className="container-fluid">
                <div id="discography-row" className="row">
                    <div id="discography-col" className="col">
                        <h4>Discography:</h4>
                        <div id="albuns-inner-row" className="row">
                            {fetchedArtistDiscographyArray.map(album => (
                                <Album 
                                    albumContent={album} 
                                    onArtistClick={onArtistClick}
                                    onAlbumClick={onAlbumClick} 
                                    onPlayButton={onPlayButton}
                                    userPlaylistsArr={userPlaylistsArr}
                                    accessToken={accessToken} 
                                    key={album.albumUri}/>
                            ))}
                        </div>  
                    </div>
                </div>
            </div>
        </>
    );
}

export default DiscographyBox;