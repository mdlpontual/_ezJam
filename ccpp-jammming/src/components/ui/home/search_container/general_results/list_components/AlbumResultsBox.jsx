import React, { useEffect, useState } from "react";
import AlbumResultItem from "./unit_components/AlbumResultItem";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";
import IMG from "../../../../../../assets/images/ImagesHUB";

function AlbumResultsBox({ searchArtistResults, searchAlbumResults,
                             searchTrackResults, onArtistClick, 
                             onAlbumClick, onPlayButton, 
                             userPlaylistsArr, urlSearch, accessToken }) {
                                
    const { fetchedArtistsArray, 
            fetchedAlbumsArray, 
            fetchedTracksArray, 
            fetchMissingArtistByName } = useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken });
    const [updatedArtistContent, setUpdatedArtistContent] = useState([]);

    console.log("album")

    useEffect(() => {
        setUpdatedArtistContent(fetchedArtistsArray);
    }, [fetchedArtistsArray]);

    return (
        <>
            <div id="album-box-title" className="container-fluid d-flex justify-content-between align-items-center">
                <h4>Albums:</h4>
                <a title="Open Spotify" id="white-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/search/${urlSearch}`} target="_blank" rel="noopener noreferrer">
                    <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIconWhite} width="30px"/> Open Spotify</p>
                </a>
                <a title="Open Spotify" id="green-logo" className="row justify-content-center align-items-center" href={`https://open.spotify.com/search/${urlSearch}`} target="_blank" rel="noopener noreferrer">
                    <p className="col d-flex justify-content-center align-items-center"><img src={IMG.spotifyIcon} width="30px"/> Open Spotify</p>
                </a>
            </div>
            { fetchedAlbumsArray.filter((album, idx) => idx < 5).map(album => {
                let matchingArtist = updatedArtistContent.find(artist => artist.artistName === album.albumAuthor);

/*                 // If matchingArtist is not found, trigger a fetch
                if (!matchingArtist) {
                    fetchMissingArtistByName(album.albumAuthor).then(newArtist => {
                        if (newArtist) {
                            setUpdatedArtistContent(prevContent => [...prevContent, newArtist]);
                        }
                    });
                } */

                return (
                    <AlbumResultItem 
                        albumContent={album}
                        artistContent={matchingArtist} 
                        fetchedArtistsArray={fetchedArtistsArray}
                        fetchedTracksArray={fetchedTracksArray}
                        onArtistClick={onArtistClick}
                        onAlbumClick={onAlbumClick} 
                        onPlayButton={onPlayButton}
                        userPlaylistsArr={userPlaylistsArr}
                        accessToken={accessToken}
                        key={album.albumUri}
                    />
                );
            })}
        </>
    );
}

export default AlbumResultsBox;