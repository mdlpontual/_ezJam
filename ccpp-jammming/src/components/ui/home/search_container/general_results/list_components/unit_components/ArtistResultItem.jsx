import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function ArtistResultItem({ artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken }) {
    let profilePicture;
    if (artistContent.artistProfileImg) {
        profilePicture = artistContent.artistProfileImg;
    } else {
        profilePicture = IMG.profilePlaceHolder;
    }

    return (
        <>
            <div id="artist-inner-row" className="row flex-column d-flex justify-content-center align-items-center">
                <div id="artist-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={profilePicture} alt="profile picture" height="175x"/>
                </div>
                <div id="artist-name" className="col d-flex justify-content-center align-items-start">
                    <h5 id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
                        {artistContent.artistName}
                    </h5>
                </div>
            </div>
        </>
    );
}

export default ArtistResultItem;