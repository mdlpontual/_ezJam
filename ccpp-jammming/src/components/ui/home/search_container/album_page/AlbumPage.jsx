import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import AlbumTracks from "./AlbumTracks";
import useFetchContent from "../../../../../hooks/useFetchContent";

function AlbumPage({ albumContent, onArtistClick, onAlbumClick, onPlayButton, playTrack, pauseTrack, accessToken }) {
    const idAlbum = albumContent.albumId;
    const { fetchedAlbumTracksArray } = useFetchContent({ idAlbum, accessToken });

    return (
        <>
            <div id="album-page-container" className="container-fluid">
                <div id="album-page-banner-row" className="row">
                    <div id="album-page-banner-col" className="col">
                        <div id="album-inner-banner-row" className="row justify-content-center align-items-center">
                            <div id="album-cover-col" className="col-auto justify-content-center align-items-center">
                                <img src={albumContent.albumCover} alt="album cover" height="115px"/>
                            </div>
                            <div id="album-title-col" className="col flex-column justify-content-end align-items-start">
                                <p>{albumContent.albumType}</p>
                                <h1>{albumContent.albumTitle}</h1>
                                <h5>by {albumContent.albumAuthor}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="album-page-songs-row" className="row">
                    <div id="album-page-songs-col" className="col">
                        <div id="top-labels" className="row">
                            <div id="col-num" className="col-1 d-flex justify-content-start align-items-end">
                                #
                            </div>
                            <div id="col-cover" className="col-1 d-flex justify-content-start align-items-end">

                            </div>
                            <div id="col-title" className="col d-flex justify-content-start align-items-end">
                                title
                            </div>
                            <div id="col-artist" className="col-2 d-flex justify-content-start align-items-center">

                            </div>
                            <div id="col-duration" className="col-1 d-flex justify-content-center align-items-end">
                                <img src={IMG.clockPNG} alt="clock icon" height="15px"/>
                            </div>
                            <div id="col-cover" className="col-1 d-flex justify-content-start align-items-end">

                            </div>
                        </div>
                        <div id="tracks-list" className="row flex-grow-1">
                            <div id="tracks-list-col" className="col">
                                {fetchedAlbumTracksArray.map(track => (
                                    <AlbumTracks 
                                        trackContent={track} 
                                        fetchedAlbumTracksArray={fetchedAlbumTracksArray}
                                        onArtistClick={onArtistClick}
                                        onAlbumClick={onAlbumClick} 
                                        onPlayButton={onPlayButton}
                                        playTrack={playTrack}
                                        pauseTrack={pauseTrack}
                                        accessToken={accessToken} 
                                        key={track.trackUri}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlbumPage;