import React, { useState, useEffect } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo"
import PlaylistTrack from "./track/PlaylistTrack";

function OpenPlaylist({ playlistData, offPlaylistClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { playlistTracksArr } = usePlaylistInfo({ playlistData, accessToken });

    return (
        <>
            <div id="open-pl-container" className="container-fluid d-flex flex-column">
                <header id="open-pl-header" className="row">
                    <div id="go-back-col" className="col-auto d-flex flex-column justify-content-center align-items-start">
                        <a id="back-to-playlists" type="button" onClick={() => offPlaylistClick(playlistData, offPlaylistClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                            <img src={IMG.gobackPNG} alt="go back button" width="22px"/>
                        </a>
                    </div>
                    <div id="title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <h3 className="align-items-center">{playlistData.playlistTitle}</h3>
                    </div>
                    <div id="checkmark-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img id="saved-icon" src={IMG.savedPNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.pencilPNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.sharePNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.trashBinPNG} alt="saved icon" width="27px"/>
                    </div>
                </header>
                <main id="open-pl-main" className="row flex-grow-1">
                    <div id="open-pl-col" className="col d-flex flex-column">
                        <div id="top-labels" className="row">
                            <div id="col-num" className="col-1 d-flex justify-content-start align-items-end">
                                #
                            </div>
                            <div id="col-cover" className="col-1 d-flex justify-content-start align-items-end">

                            </div>
                            <div id="col-title" className="col d-flex justify-content-start align-items-end">
                                title
                            </div>
                            <div id="col-plus" className="col-1 d-flex justify-content-start align-items-end"></div>
                            <div id="col-minus" className="col-1 d-flex justify-content-start align-items-end"></div>
                            <div id="col-album" className="col-2 d-flex justify-content-start align-items-end">
                                album
                            </div>
                            <div id="col-duration" className="col-1 d-flex justify-content-center align-items-end">
                                <img src={IMG.clockPNG} alt="clock icon" height="15px"/>
                            </div>
                            <div id="col-saved" className="col-1 d-flex justify-content-start align-items-end"></div>
                        </div>
                        <div id="tracks-list" className="row flex-grow-1">
                            <div id="tracks-list-col" className="col">
                                {playlistTracksArr.map((track, i) => (
                                    <PlaylistTrack 
                                        order={i} 
                                        playlistTrack={track}
                                        playlistTracksArr={playlistTracksArr}
                                        onPlayButton={onPlayButton} 
                                        onArtistClick={onArtistClick}
                                        onAlbumClick={onAlbumClick}
                                        playTrack={playTrack}
                                        pauseTrack={pauseTrack}
                                        accessToken={accessToken}
                                        key={track.trackUri} />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <footer id="open-pl-footer" className="row">
                    <div id="save-button-col" className="col d-flex flex-column justify-content-center align-items-center">
                        <button id="save-button" className="btn btn-primary btn-lg">Save to Spotify</button>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default OpenPlaylist;