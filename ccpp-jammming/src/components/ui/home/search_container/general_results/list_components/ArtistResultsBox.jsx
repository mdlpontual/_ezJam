import React from "react";
import ArtistResultItem from "./unit_components/ArtistResultItem";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";
import IMG from "../../../../../../assets/images/ImagesHUB";

function ArtistResultsBox({ searchArtistResults, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, urlSearch, accessToken }) {
    const { fetchedArtistsArray } = useFetchSearchResults({ searchArtistResults, accessToken })

    return (
        <>
            <div id="artist-box-title" className="container-fluid d-flex justify-content-between align-items-center">
                <h4>Artists:</h4>
                <a title="Open Spotify" id="white-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/search/${urlSearch}`} target="_blank" rel="noopener noreferrer">
                    <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIconWhite} width="30px"/> Open Spotify</p>
                </a>
                <a title="Open Spotify" id="green-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/search/${urlSearch}`} target="_blank" rel="noopener noreferrer">
                    <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIcon} width="30px"/> Open Spotify</p>
                </a>
            </div>
            <div id="inside-container" className="container-fluid justify-content-center align-items-center">
                <div id="inside-row" className="row justify-content-center align-items-center">
                    {fetchedArtistsArray.filter((artist, idx) => idx < 10).map(artist => (
                        <div id="inside-col" className="col justify-content-center align-items-start" key={artist.artistUri}>
                            <ArtistResultItem 
                                artistContent={artist}
                                onArtistClick={onArtistClick}
                                onAlbumClick={onAlbumClick}
                                onPlayButton={onPlayButton}
                                userPlaylistsArr={userPlaylistsArr}
                                accessToken={accessToken}
                                key={artist.artistUri}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ArtistResultsBox; 