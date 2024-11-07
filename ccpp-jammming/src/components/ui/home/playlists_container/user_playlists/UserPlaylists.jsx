import React, { useState, useEffect } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import Playlist from "./playlist/Playlist";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import useCreatePlaylist from "../../../../../hooks/user_hooks/useCreatePlaylist";
import { useAddTrack } from "../../../../../hooks/user_hooks/AddTrackContext";
import EmptyPlaylistsCollection from "./EmptyPlaylistsCollection";

function UserPlaylists({ onPlaylistClick, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { userInfo, userPlaylistsArr, setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const userId = userInfo.id;
    const { handleCreatePlaylist } = useCreatePlaylist({ accessToken, userId, refetchPlaylists });
    const { updateTrackToAdd } = useAddTrack();

    const [loading, setLoading] = useState(true);

    const handleDragOver = (event) => event.preventDefault();

    const handleDrop = (event, playlistData) => {
        event.preventDefault();
        
        const uriTrack = event.dataTransfer.getData('trackUri');
        const idTrack = JSON.parse(event.dataTransfer.getData('trackIds')); // Parse JSON string back to array
        const accessToken = event.dataTransfer.getData('accessToken');
        
        updateTrackToAdd(uriTrack, idTrack, playlistData, accessToken);
    };

    useEffect(() => {
        const timeoutDuration = userPlaylistsArr.length > 0 ? 200 : 200;
        const timer = setTimeout(() => setLoading(false), timeoutDuration);
        return () => clearTimeout(timer);
    }, [userPlaylistsArr]);

    return (
        <div id="playlists-container" className="container-fluid d-flex flex-column">
            <header id="pl-header-row" className="row justify-content-center align-items-center">
                <div id="pl-heading-col" className="col d-flex justify-content-start align-items-center">
                    <h3>{userInfo.display_name}'s Playlists:</h3>
                </div>
                <div id="add-button-col" className="col-auto d-flex justify-content-end align-items-center">
                    <a id="create-pl-button" type="button" onClick={handleCreatePlaylist}>
                        <img id="plus" src={IMG.plusPNG} alt="add playlist button" height="45px" />
                        <img id="plusGreen" src={IMG.plusGreenPNG} alt="add playlist button" height="45px" />
                    </a>
                </div>
            </header>
            {loading ? (
                <main id="pl-body-row" className="row">
                    <div className="d-flex justify-content-center align-items-center">Loading...</div>
                </main>
            ) : userPlaylistsArr.length === 0 ? ( 
                <main id="pl-body-row" className="row">
                    <EmptyPlaylistsCollection />
                </main>
            ) : (
                <main id="pl-body-row" className="row">
                    <div id="pl-body-col" className="col">
                        {userPlaylistsArr.map((playlist) => (
                            <div key={playlist.playlistUri} onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, playlist)}>
                                <Playlist
                                    playlistData={playlist}
                                    onPlaylistClick={onPlaylistClick}
                                    onBackClick={onBackClick}
                                    onPlayButton={onPlayButton}
                                    onArtistClick={onArtistClick}
                                    onAlbumClick={onAlbumClick}
                                    playTrack={playTrack}
                                    pauseTrack={pauseTrack}
                                    refetchPlaylists={refetchPlaylists}
                                    editPlaylists={editPlaylists}
                                    setUserPlaylistsArr={setUserPlaylistsArr}
                                    accessToken={accessToken}
                                />
                            </div>
                        ))}
                    </div>
                </main>
            )}
        </div>
    );
}

export default UserPlaylists;