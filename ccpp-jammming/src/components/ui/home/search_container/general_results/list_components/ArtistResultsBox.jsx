import React from "react";
import ArtistResultItem from "./unit_components/ArtistResultItem";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";

function ArtistResultsBox({ searchArtistResults, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken }) {
    const { fetchedArtistsArray } = useFetchSearchResults({ searchArtistResults, accessToken })

    return (
        <>
            <h4>artists:</h4>
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