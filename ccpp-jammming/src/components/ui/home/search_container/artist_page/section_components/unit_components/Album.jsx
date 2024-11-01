import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Album({ albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken }) {
    let coverPicture;
    if (albumContent.albumCover) {
        coverPicture = albumContent.albumCover;
    } else {
        coverPicture = IMG.profilePlaceHolder;
    }
    
    return (
        <>
            <div id="album-thumbnail" className="col-sm-6 col-md-4 col-lg-4 col-xl-3" >
                <img src={coverPicture} alt="album cover" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)} />         
                <h6 type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)} >
                    {albumContent.albumTitle}
                </h6>
                <p>{albumContent.albumYear} - {albumContent.albumType}</p>
            </div>
        </>
    );
}

export default Album;