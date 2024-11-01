import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import useFetchId from "../../../../../hooks/useFetchId";
import useFetchSearchResults from "../../../../../hooks/useFetchSearchResults";

function TrackDisplay({ currentTrack, onPlayButton, onArtistClick, onAlbumClick, userPlaylistsArr, accessToken }) {
    const search = currentTrack.artists[0].name;
    const albumCurrent = currentTrack.album.name;

    const { searchArtistResults, searchAlbumResults } = useFetchId({ search, accessToken });
    const { fetchedArtistsArray, fetchedAlbumsArray } = useFetchSearchResults({ searchArtistResults, searchAlbumResults, accessToken });

    const artistContent = fetchedArtistsArray.find(artist => artist.artistName === search);
    const albumContent = fetchedAlbumsArray.find(album => album.albumTitle === albumCurrent);

    let coverPicture;
    if (currentTrack.album.images[1].url) {
        coverPicture = currentTrack.album.images[1].url;
    } else {
        coverPicture = IMG.profilePlaceHolder;
    }
    
    return (
        <>
            <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                <a id="display-cover" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>
                    <img src={coverPicture} height="70px" width="70px"/>
                </a>
            </div>
            <div id="col-title" className="row d-flex flex-column justify-content-center align-items-start">
                <h5>{currentTrack.name}</h5>
                <p id="display-artist" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>
                    {currentTrack.artists[0].name}
                </p>
            </div>
            <div id="col-blank" className="col"></div>
        </>
    );
}

export default TrackDisplay;