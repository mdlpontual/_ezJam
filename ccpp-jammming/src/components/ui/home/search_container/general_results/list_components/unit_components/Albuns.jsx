import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Albuns({ album, artist, onAlbumClick, onArtistClick }) {
    let albumCover;
    if (album.cover) {
        albumCover = album.cover;
    } else {
        albumCover = IMG.placeHolders;
    }
    
    return (
        <>
            <div id="albuns-inner-row" className="row">
                <div id="album-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={album.cover} alt="album cover" height="65px"/>
                </div>
                <div id="album-title" className="col d-flex flex-column justify-content-center align-items-start">
                    <a id="open-album-page" type="button" onClick={() => onAlbumClick(album)}>
                        <h5>{album.album}</h5>
                    </a>
                    <p>{album.year} - <a id="open-artist-page" type="button" onClick={() => onArtistClick(artist)}>{album.artist}</a></p>
                </div>
            </div>  
        </>
    );
}

export default Albuns;