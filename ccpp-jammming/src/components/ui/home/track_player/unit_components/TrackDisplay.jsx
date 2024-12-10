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
            <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center d-none d-lg-flex">
                <a id="display-cover" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>
                    <img title={albumCurrent} src={coverPicture} height="75px" width="75px" />
                </a>
            </div>
            <div id="col-title" className="row d-flex flex-column justify-content-center align-items-start">
                <div id="logo-box-title" className="container-fluid d-flex justify-content-start align-items-center">
                    <a id="white-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/`} target="_blank" rel="noopener noreferrer" >
                        <img title="Open Spotify" className="col d-flex justify-content-start align-items-center" src={IMG.spotifyLogo} width="100px"/>
                    </a>
                    <a id="green-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/`} target="_blank" rel="noopener noreferrer">
                        <img title="Open Spotify" className="col d-flex justify-content-center align-items-center" src={IMG.spotifyLogoWhite} width="100px"/>
                    </a>
                </div>
                <h5 title={currentTrack.name}>{currentTrack.name}</h5>
                <p title={currentTrack.artists[0].name} id="display-artist" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>
                    {currentTrack.artists[0].name}
                </p>
            </div>
            <div id="col-blank" className="col"></div>
        </>
    );
}

export default TrackDisplay;