import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Artists({ searchArtistResults, searchAlbumResults, searchTrackResults, artistContent, albumContent, songContent, onArtistClick, onAlbumClick }) {
    let profilePicture;
    if (searchArtistResults.profile) {
        profilePicture = searchArtistResults.profile;
    } else {
        profilePicture = IMG.profilePlaceHolder;
    }

    return (
        <>
            <div id="artist-inner-row" className="row d-flex justify-content-center align-items-center">
                <div id="artist-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={profilePicture} alt="profile picture" height="65px"/>
                </div>
                <div id="artist-name" className="col d-flex justify-content-start align-items-center">
                    <a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, albumContent, songContent, searchArtistResults)}>
                        <h5>{searchArtistResults.artist}</h5>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Artists;