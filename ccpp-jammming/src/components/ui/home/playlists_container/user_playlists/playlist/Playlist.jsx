import React, { useEffect } from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import usePlaylistActions from "../../../../../../hooks/user_hooks/usePlaylistActions";
import { useSave } from "../../../../../../hooks/user_hooks/SaveContext"; // Import the Save context

function Playlist({ playlistData, onPlaylistClick, 
                    onBackClick, onPlayButton, onArtistClick, 
                    onAlbumClick, playTrack, pauseTrack, 
                    refetchPlaylists, editPlaylists, 
                    setUserPlaylistsArr, accessToken }) {

    const { handleEditPlaylist, handleSharePlaylist, handleUnfollowPlaylist } = usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken });

    const cover = playlistData.playlistCover || IMG.placeHolders;

    // Use the save context to get the save state for this specific playlist
    const { getIsSaved } = useSave();
    const isSaved = getIsSaved(playlistData.playlistId); // Get the saved state for this playlist

    return (
        <div id="single-pl-container" className="container-fluid" >
            <div id="single-pl-row" className="row">
                <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                    <img id="playlist-cover" src={cover} alt="saved icon" width="65px" />
                </div>
                <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                    <h3 title={playlistData.playlistTitle} id="pl-name" type="button" onClick={() => onPlaylistClick(playlistData, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken)}>
                        {playlistData.playlistTitle}
                    </h3>
                </div>
                <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center d-none d-md-flex">
                    <div id="edit-pl-button" type="button" className="justify-content-center align-items-center" onClick={handleEditPlaylist}>
                        <img title="Edit this Playlist Name" src={IMG.pencilPNG} alt="edit icon" width="25px" />
                    </div>
                </div>
                <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center d-none d-md-flex">
                    <a id="share-pl-button" type="button" onClick={handleSharePlaylist}>
                        <img title="Share this Playlist" src={IMG.sharePNG} alt="share icon" width="25px" />
                    </a>
                </div>
                <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center d-none d-md-flex">
                    <a id="delete-pl-button" type="button" onClick={handleUnfollowPlaylist}>
                        <img title="Delete this Playlist" src={IMG.trashBinPNG} alt="delete icon" width="25px" />
                    </a>
                </div>
                <div id="col-saved" className="col-auto d-flex justify-content-center align-items-center">
                    <img 
                        id="saved-icon" 
                        title={isSaved ? "This Playlist is Saved" : "This Playlist is not Saved"} 
                        src={isSaved ? IMG.savedPNG : IMG.cautionPNG}  // Sync saved state from global state
                        height="30px" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Playlist;