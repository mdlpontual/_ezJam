import React from "react";
import Album from "./unit_components/Album";
import IMG from "../../../../../../assets/images/ImagesHUB";

function DiscographyBox({ fetchedArtistDiscographyArray, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken }) {
    return (
        <>
            <div id="discography-container" className="container-fluid">
                <div id="discography-row" className="row">
                    <div id="discography-col" className="col">
                        <div id="disco-box-title" className="container-fluid d-flex justify-content-between align-items-center">
                            <h4>Discography:</h4>
                            <a id="white-logo" href="https://open.spotify.com/intl-pt" target="_blank" rel="noopener noreferrer">
                                <img src={IMG.spotifyLogoWhite} width="100px"/>
                            </a>
                            <a id="green-logo" href="https://open.spotify.com/intl-pt" target="_blank" rel="noopener noreferrer">
                                <img src={IMG.spotifyLogo} width="100px"/>
                            </a>
                        </div>
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