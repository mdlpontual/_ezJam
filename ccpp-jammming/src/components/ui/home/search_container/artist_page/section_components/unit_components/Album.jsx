import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Album({ discographyAlbum, fetchedAlbumTracksArray, onAlbumClick, accessToken }) {
    let coverPicture;
    if (discographyAlbum.albumCover) {
        coverPicture = discographyAlbum.albumCover;
    } else {
        coverPicture = IMG.profilePlaceHolder;
    }
    
    return (
        <>
            <div id="album-thumbnail" className="col-sm-6 col-md-4 col-lg-4 col-xl-3" >
                <a type="button" onClick={() => onAlbumClick(fetchedAlbumTracksArray, accessToken)} >
                    <img src={coverPicture} alt="album cover"/>
                </a>
                <h6>
                    <a type="button" onClick={() => onAlbumClick(fetchedAlbumTracksArray, accessToken)} >
                        {discographyAlbum.albumTitle}
                    </a>
                </h6>
                <p>{discographyAlbum.albumYear} - {discographyAlbum.albumType}</p>
            </div>
        </>
    );
}

export default Album;