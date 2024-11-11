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
                            <img id="white-logo" type="button" src={IMG.spotifyLogoWhite} width="100px"/>
                            <img id="green-logo" type="button" src={IMG.spotifyLogo} width="100px"/>
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