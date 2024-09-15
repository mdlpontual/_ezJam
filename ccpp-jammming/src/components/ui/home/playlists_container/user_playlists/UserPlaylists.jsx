import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import Playlist from "./playlist/Playlist";
import useUser from "../../../../../hooks/user_hooks/useUser";

function UserPlaylists({onPlaylistClick, offPlaylistClick, accessToken}) {
    const { userInfo, userPlaylistsArr } = useUser({accessToken});

    return (
        <>
            <div id="playlists-container" className="container-fluid d-flex flex-column">
                <header id="pl-header-row" className="row justify-content-center align-items-center">
                    <div id="pl-heading-col" className="col d-flex justify-content-start align-items-center">
                        <h3>{userInfo.display_name}'s Playlists:</h3>
                    </div>
                    <div id="add-button-col" className="col-auto d-flex justify-content-end align-items-center">
                        <img src={IMG.plusPNG} alt="add playlist button" height="40px"/>
                    </div>
                </header>
                <main id="pl-body-row" className="row">
                    <div id="pl-body-col" className="col" >
                        {userPlaylistsArr.map((playlist) => (
                            <Playlist 
                                playlistData={playlist}
                                onPlaylistClick={onPlaylistClick}
                                offPlaylistClick={offPlaylistClick}
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