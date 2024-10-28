import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function AlbumResultItem({ artistContent, albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken }) {
    let albumCoverImg;
    if (albumContent.albumCover) {
        albumCoverImg = albumContent.albumCover;
    } else {
        albumCoverImg = IMG.placeHolders;
    }
    
    return (
        <>
            <div id="albuns-inner-row" className="row">
                <div id="album-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={albumCoverImg} alt="album cover" height="75px"/>
                </div>
                <div id="album-title" className="col d-flex flex-column justify-content-center align-items-start">
                    <h5 id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
                        {albumContent.albumTitle}
                    </h5>
                    <p>{albumContent.albumYear} - <a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
                            {albumContent.albumAuthor}
                        </a>
                    </p>
                </div>
            </div>  
        </>
    );
}

export default AlbumResultItem;

/*
<div id="col-title" className="col d-flex justify-content-start align-items-center">
    <h5>{trackContent.trackTitle}</h5>
    <p><a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>{trackContent.trackAuthor}</a></p>
</div>
<div id="col-album" className="col-3 d-flex justify-content-start align-items-center">
    <p><a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>{trackContent.trackAlbum}</a></p>
</div>

*/