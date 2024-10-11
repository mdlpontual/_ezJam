import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo";
import PlaylistTrack from "./track/PlaylistTrack";
import usePlaylistActions from "../../../../../hooks/user_hooks/usePlaylistActions";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import { DndContext } from '@dnd-kit/core'; // Importing DnD-kit components
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'; // Importing sorting strategy and arrayMove

function OpenPlaylist({ playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { playlistTracksArr, setPlaylistTracksArr } = usePlaylistInfo({ playlistData, accessToken });
    const { setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist, reorderTracksInPlaylist, newEditedName } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });

    // Function to handle drag end event and update the track order
    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = playlistTracksArr.findIndex((track) => track.trackUri === active.id);
            const newIndex = playlistTracksArr.findIndex((track) => track.trackUri === over.id);

            const reorderedTracks = arrayMove(playlistTracksArr, oldIndex, newIndex);
            setPlaylistTracksArr(reorderedTracks);

            // Updating Spotify with the new order
            const uris = reorderedTracks.map(track => track.trackUri);
            try {
                await reorderTracksInPlaylist(playlistData.playlistId, uris); // Calling the reorderTracksInPlaylist function from usePlaylistActions
            } catch (error) {
                console.error("Error reordering tracks:", error);
            }
        }
    };

    return (
        <>
            <div id="open-pl-container" className="container-fluid d-flex flex-column">
                <header id="open-pl-header" className="row">
                    <div id="go-back-col" className="col-auto d-flex flex-column justify-content-center align-items-start">
                        <a id="back-to-playlists" type="button" onClick={() => onBackClick()}>
                            <img src={IMG.gobackPNG} alt="go back button" width="22px" />
                        </a>
                    </div>
                    <div id="title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <h3 className="align-items-center">{newEditedName}</h3>
                    </div>
                    <div id="checkmark-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img id="saved-icon" src={IMG.savedPNG} alt="saved icon" width="27px" />
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="edit-button" type="button" onClick={handleEditPlaylist}>
                            <img src={IMG.pencilPNG} alt="saved icon" width="27px" />
                        </a>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="share-button" type="button" onClick={handleSharePlaylist}>
                            <img src={IMG.sharePNG} alt="saved icon" width="27px" />
                        </a>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="delete-button" type="button" onClick={() => {
                            handleUnfollowPlaylist();
                            setTimeout(() => {
                                onBackClick();
                            }, 500);
                        }}>
                            <img src={IMG.trashBinPNG} alt="saved icon" width="27px" />
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
                                <img src={IMG.clockPNG} alt="clock icon" height="15px" />
                            </div>
                            <div id="col-saved" className="col-1 d-flex justify-content-start align-items-end"></div>
                        </div>
                        <div id="tracks-list" className="row flex-grow-1">
                            <div id="tracks-list-col" className="col">
                                {/* Wrap PlaylistTrack components in the DndContext and SortableContext */}
                                <DndContext onDragEnd={handleDragEnd}>
                                    <SortableContext items={playlistTracksArr.map(track => track.trackUri)} strategy={verticalListSortingStrategy}>
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
                                                key={track.trackUri}
                                            />
                                        ))}
                                    </SortableContext>
                                </DndContext>
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


/* import React, { useState, useEffect } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import usePlaylistInfo from "../../../../../hooks/user_hooks/usePlaylistInfo"
import PlaylistTrack from "./track/PlaylistTrack";
import usePlaylistActions from "../../../../../hooks/user_hooks/usePlaylistActions";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";

function OpenPlaylist({ playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { playlistTracksArr } = usePlaylistInfo({ playlistData, accessToken });
    const { setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({accessToken});
    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist, newEditedName } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });

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
                        <h3 className="align-items-center">{newEditedName}</h3>
                    </div>
                    <div id="checkmark-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img id="saved-icon" src={IMG.savedPNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="edit-button" type="button" onClick={handleEditPlaylist}>
                            <img src={IMG.pencilPNG} alt="saved icon" width="27px"/>
                        </a>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="share-button" type="button" onClick={handleSharePlaylist}>
                            <img src={IMG.sharePNG} alt="saved icon" width="27px"/>
                        </a>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <a id="delete-button" type="button" onClick={() => {
                                handleUnfollowPlaylist();
                                setTimeout(() => {
                                    onBackClick();
                                }, 500); 
                            }}>
                            <img src={IMG.trashBinPNG} alt="saved icon" width="27px" />
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

export default OpenPlaylist; */