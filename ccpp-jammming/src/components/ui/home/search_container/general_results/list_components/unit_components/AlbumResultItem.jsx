import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function AlbumResultItem({ artistContent, albumContent, onArtistClick, onAlbumClick, accessToken }) {
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
                    <img src={albumCoverImg} alt="album cover" height="65px"/>
                </div>
                <div id="album-title" className="col d-flex flex-column justify-content-center align-items-start">
                    <a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, accessToken)}>
                        <h5>{albumContent.albumTitle}</h5>
                    </a>
                    <p>{albumContent.albumYear} - <a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, accessToken)}>{albumContent.albumAuthor}</a></p>
                </div>
            </div>  
        </>
    );
}

export default AlbumResultItem;