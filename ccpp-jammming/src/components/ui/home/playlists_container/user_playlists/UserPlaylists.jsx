import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import Playlist from "./playlist/Playlist";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import useCreatePlaylist from "../../../../../hooks/user_hooks/useCreatePlaylist";

function UserPlaylists({onPlaylistClick, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken}) {          
    const { userInfo, userPlaylistsArr, setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({accessToken});
    const userId = userInfo.id;
    const { createPlaylist } = useCreatePlaylist({ accessToken, userId });

    const handleCreatePlaylist = async () => {
        const playlistName = prompt("Type your new playlist's name:");
        if (!playlistName || playlistName.trim() === "") {
            alert("Playlist name is required.");
            return;
        }

        // Create the new playlist
        await createPlaylist(playlistName, "", true);

        // Re-fetch playlists to include the newly created one
        await refetchPlaylists();
    };

    return (
        <>
            <div id="playlists-container" className="container-fluid d-flex flex-column">
                <header id="pl-header-row" className="row justify-content-center align-items-center">
                    <div id="pl-heading-col" className="col d-flex justify-content-start align-items-center">
                        <h3>{userInfo.display_name}'s Playlists:</h3>
                    </div>
                    <div id="add-button-col" className="col-auto d-flex justify-content-end align-items-center">
                        <a id="create-pl-button" type="button" onClick={handleCreatePlaylist}>
                            <img src={IMG.plusPNG} alt="add playlist button" height="40px"/>
                        </a>
                    </div>
                </header>
                <main id="pl-body-row" className="row">
                    <div id="pl-body-col" className="col">
                        {userPlaylistsArr.map((playlist) => (
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
                                key={playlist.playlistUri}/>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default UserPlaylists;