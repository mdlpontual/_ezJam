import React from "react";
import Album from "./unit_components/Album";
import IMG from "../../../../../../assets/images/ImagesHUB";

function DiscographyBox({ fetchedArtistDiscographyArray, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, idArtist, accessToken }) {
    
    return (
        <>
            <div id="discography-container" className="container-fluid">
                <div id="discography-row" className="row">
                    <div id="discography-col" className="col">
                        <div id="disco-box-title" className="container-fluid d-flex justify-content-between align-items-center">
                            <h4>Discography:</h4>
                            <a id="white-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/artist/${idArtist}/discography/all`} target="_blank" rel="noopener noreferrer">
                                <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIconWhite} width="30px"/> Open Spotify</p>
                            </a>
                            <a id="green-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/artist/${idArtist}/discography/all`} target="_blank" rel="noopener noreferrer">
                                <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIcon} width="30px"/> Open Spotify</p>
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