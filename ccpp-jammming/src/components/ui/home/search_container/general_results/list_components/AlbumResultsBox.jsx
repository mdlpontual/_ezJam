import React, { useEffect, useState } from "react";
import AlbumResultItem from "./unit_components/AlbumResultItem";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";
import IMG from "../../../../../../assets/images/ImagesHUB";

function AlbumResultsBox({ searchArtistResults, searchAlbumResults,
                             searchTrackResults, onArtistClick, 
                             onAlbumClick, onPlayButton, 
                             userPlaylistsArr, accessToken }) {
                                
    const { fetchedArtistsArray, 
            fetchedAlbumsArray, 
            fetchedTracksArray, 
            fetchMissingArtistByName } = useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken });
    const [updatedArtistContent, setUpdatedArtistContent] = useState([]);

    useEffect(() => {
        setUpdatedArtistContent(fetchedArtistsArray);
    }, [fetchedArtistsArray]);

    return (
        <>
            <div id="album-box-title" className="container-fluid d-flex justify-content-between align-items-center">
                <h4>Albums:</h4>
                <img id="white-logo" type="button" src={IMG.spotifyLogoWhite} width="100px"/>
                <img id="green-logo" type="button" src={IMG.spotifyLogo} width="100px"/>
            </div>
            { fetchedAlbumsArray.filter((album, idx) => idx < 5).map(album => {
                let matchingArtist = updatedArtistContent.find(artist => artist.artistName === album.albumAuthor);

                // If matchingArtist is not found, trigger a fetch
                if (!matchingArtist) {
                    fetchMissingArtistByName(album.albumAuthor).then(newArtist => {
                        if (newArtist) {
                            setUpdatedArtistContent(prevContent => [...prevContent, newArtist]);
                        }
                    });
                }

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