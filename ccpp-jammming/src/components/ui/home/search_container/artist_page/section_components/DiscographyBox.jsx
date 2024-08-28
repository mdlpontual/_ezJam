import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Album from "./unit_components/Album";
import useFetchContent from "../../../../../../hooks/useFetchContent";

function DiscographyBox({ fetchedArtistDiscographyArray, onAlbumClick, accessToken }) {
    return (
        <>
            <div id="discography-container" className="container-fluid">
                <div id="discography-row" className="row">
                    <div id="discography-col" className="col">
                        <h4>Discography:</h4>
                        <div id="albuns-inner-row" className="row">
                            {fetchedArtistDiscographyArray.map((album) => {
                                const idAlbum = album.albumId;
                                const { fetchedAlbumTracksArray } = useFetchContent( idAlbum, accessToken );

                                return (
                                    <Album 
                                        discographyAlbum={album} 
                                        fetchedAlbumTracksArray={fetchedAlbumTracksArray} 
                                        onAlbumClick={onAlbumClick} 
                                        accessToken={accessToken} 
                                        key={album.albumUri}/>
                                )
                            })}
                        </div>  
                    </div>
                </div>
            </div>
        </>
    );
}

export default DiscographyBox;