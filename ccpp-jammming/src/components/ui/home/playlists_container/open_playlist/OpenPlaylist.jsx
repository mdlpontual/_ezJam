import React, { useState, useEffect } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo"
import PlaylistTrack from "./track/PlaylistTrack";
import usePlaylistActions from "../../../../../hooks/user_hooks/usePlaylistActions";

function OpenPlaylist({ playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { playlistTracksArr } = usePlaylistInfo({ playlistData, accessToken });
    const { editPlaylistName, unfollowPlaylist } = usePlaylistActions({ accessToken });

    const handleEditPlaylist = async () => {
        const newPlaylistName = prompt("Enter the new playlist name:", playlistData.playlistTitle);
        if (newPlaylistName && newPlaylistName.trim() !== "") {
            try {
                // Call the API to update the playlist name
                await editPlaylistName(playlistData.playlistId, newPlaylistName);

                // Immediately update the playlist name locally in userPlaylistsArr
                setUserPlaylistsArr((prevPlaylists) =>
                    prevPlaylists.map((playlist) =>
                        playlist.playlistId === playlistData.playlistId
                            ? { ...playlist, playlistTitle: newPlaylistName }
                            : playlist
                    )
                );

                await refetchPlaylists(newPlaylistName, playlistData.playlistId);

            } catch (error) {
                console.error("Error updating playlist or re-fetching:", error);
            }
        }
    };

    // Function to handle sharing the playlist URL
    const handleSharePlaylist = () => {
        const playlistUrl = `https://open.spotify.com/playlist/${playlistData.playlistId}`;
        navigator.clipboard.writeText(playlistUrl)
            .then(() => {
                alert(`Playlist URL copied to clipboard!`);
            })
            .catch((error) => {
                console.error("Error copying playlist URL:", error);
            });
    };

    const handleUnfollowPlaylist = async () => {
        const confirmUnfollow = window.confirm("Are you sure you want to unfollow this playlist?");
        if (confirmUnfollow) {
            try {
                await unfollowPlaylist(playlistData.playlistId);

                // Remove the unfollowed playlist locally
                setUserPlaylistsArr((prevPlaylists) =>
                    prevPlaylists.filter(playlist => playlist.playlistId !== playlistData.playlistId)
                );

                await refetchPlaylists(); 

            } catch (error) {
                console.error("Error unfollowing playlist:", error);
            }
        }
    };

    return (
        <>
            <div id="open-pl-container" className="container-fluid d-flex flex-column">
                <header id="open-pl-header" className="row">
                    <div id="go-back-col" className="col-auto d-flex flex-column justify-content-center align-items-start">
                        <a id="back-to-playlists" type="button" onClick={() => onBackClick()}>
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
                        <a id="edit-button" type="button" onClick={handleSharePlaylist}>
                            <img src={IMG.pencilPNG} alt="saved icon" width="27px"/>
                        </a>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="share-button" type="button" onClick={handleSharePlaylist}>
                            <img src={IMG.sharePNG} alt="saved icon" width="27px"/>
                        </a>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="delete-button" type="button" onClick={handleUnfollowPlaylist}>
                            <img src={IMG.trashBinPNG} alt="saved icon" width="27px"/>
                        </a>
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