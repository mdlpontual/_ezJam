import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Albuns({ searchArtistResults, searchAlbumResults, searchTrackResults, artistContent, albumContent, songContent, onArtistClick, onAlbumClick }) {
    let albumCover;
    if (searchAlbumResults.cover) {
        albumCover = searchAlbumResults.cover;
    } else {
        albumCover = IMG.placeHolders;
    }
    
    return (
        <>
            <div id="albuns-inner-row" className="row">
                <div id="album-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={albumCover} alt="album cover" height="65px"/>
                </div>
                <div id="album-title" className="col d-flex flex-column justify-content-center align-items-start">
                    <a id="open-album-page" type="button" onClick={() => onAlbumClick(artistContent, albumContent, songContent)}>
                        <h5>{searchAlbumResults.album}</h5>
                    </a>
                    <p>{searchAlbumResults.year} - <a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, albumContent, songContent, searchAlbumResults)}>{searchAlbumResults.artist}</a></p>
                </div>
            </div>  
        </>
    );
}

export default Albuns;