import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../../hooks/TrackContext";
import { useAddTrack } from "../../../../../../../hooks/user_hooks/AddTrackContext";
import Equalizer from "../../../../../../../utils/Equalizer";
import useUserInfo from "../../../../../../../hooks/user_hooks/useUserInfo";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function TrackResultItem({  artistContent, albumContent, trackContent, 
                            fetchedTracksArray, onArtistClick, onAlbumClick, 
                            onPlayButton, playTrack, pauseTrack, 
                            onTrackClick, isSelected, selectedTracks, accessToken }) {
    const { currentTrackUri, isPaused } = useTrack(); 
    const { updateTrackToAdd } = useAddTrack();
    const { userPlaylistsArr } = useUserInfo({accessToken});
    
    const uriTrack = trackContent.trackUri;
    const idTrack = trackContent.trackId;
    let uriQueue = [];
    fetchedTracksArray.map(track => uriQueue.push(track.trackUri));
    const selectedTracksIds = selectedTracks.length > 0 ? selectedTracks.map(track => track.substring(14)) : idTrack;

    let trackCover;
    if (trackContent.trackCover) {
        trackCover = trackContent.trackCover;
    } else {
        trackCover = IMG.placeHolders;
    }

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const handleTogglePlay = (e) => {
        e.stopPropagation();
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    // Handle drag start
    const handleDragStart = (event) => {
        event.dataTransfer.setData('trackUri', uriTrack);
        event.dataTransfer.setData('trackIds', JSON.stringify(selectedTracksIds)); // Convert array to JSON string
        event.dataTransfer.setData('accessToken', accessToken);
        console.log("TrackResultItem - Selected Track IDs:", JSON.stringify(selectedTracksIds)); // This should now log all IDs
    };

    const handleDropDownAdd = (playlistData) => {
        if (selectedTracksIds === 0) {
            updateTrackToAdd(uriTrack, idTrack, playlistData, accessToken)
            console.log(idTrack)
        } else {
            updateTrackToAdd(uriTrack, selectedTracksIds, playlistData, accessToken)
            console.log(selectedTracksIds)
        }
    };

    if(currentTrackUri !== uriTrack) {
        return (
            <>
                <div id="songs-inner-row" className={`row ${isSelected ? 'selected-track2' : ''}`} draggable="true" onDragStart={handleDragStart} onClick={onTrackClick}>
                    <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                        <div className="drag" draggable="false" onDragStart={handleDragStart}> 
                            <img src={IMG.dragPNG} height="25px" />
                        </div>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <img id="cover-img"src={trackCover} height="40px"/>
                        <a id="play-button" type="button" onClick={() => onPlayButton(uriTrack, uriQueue)}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="20px"/>
                        </a>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{trackContent.trackTitle}</h5>
                        <p><a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>{trackContent.trackAuthor}</a></p>
                    </div>
                    <div id="col-album" className="col-3 d-flex justify-content-start align-items-center">
                        <p><a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>{trackContent.trackAlbum}</a></p>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                    </div>
                    <div id="col-plus" className="dropdown col-1 d-flex justify-content-end align-items-center">
                        <div className="dropdown">
                            <button id="plus-dd" className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.stopPropagation()}>
                                <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                                <img id="plus-icon-green" src={IMG.plus2GreenPNG} alt="plus icon" width="25px"/>
                            </button>
                            <ul id="dropdown-ul" className="dropdown-menu">
                                <li><h5 id="dd-top-text" className="dropdown-item">Select a playlist to add this track:</h5></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                {userPlaylistsArr.map((playlistData) => (
                                    <li key={playlistData.playlistId}>
                                        <a id="dd-item" className="dropdown-item" type="button" onClick={(e) => {handleDropDownAdd(playlistData); e.stopPropagation()}}>
                                            {playlistData.playlistTitle}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div> 
            </>
        );
    }
    return (
        <>
            <div id="songs-inner-row-green" className={`row ${isSelected ? 'selected-track2' : ''}`} draggable="true" onDragStart={handleDragStart} onClick={onTrackClick}>
                <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                    <div className="drag">
                        <img src={IMG.greenDragPNG} height="25px" />
                    </div>
                </div>
                <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                    <img id="cover-img"src={trackCover} height="40px"/>
                    <a className="col-1 d-flex justify-content-center align-items-center" id="play-button" type="button" onClick={handleTogglePlay}>
                        <div className="d-flex justify-content-center align-items-center" id="play-icon">
                            {isPaused ? <img src={IMG.playPNG2Green} alt="play icon" width="22px" /> : <Equalizer />}
                        </div>
                    </a>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{trackContent.trackTitle}</h5>
                    <p><a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>{trackContent.trackAuthor}</a></p>
                </div>
                <div id="col-album" className="col-3 d-flex justify-content-start align-items-center">
                    <p><a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>{trackContent.trackAlbum}</a></p>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                </div>
                <div id="col-plus" className="dropdown col-1 d-flex justify-content-end align-items-center">
                    <div className="dropdown">
                        <button id="plus-dd" className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.stopPropagation()}>
                            <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                            <img id="plus-icon-green" src={IMG.plus2GreenPNG} alt="plus icon" width="25px"/>
                        </button>
                        <ul id="dropdown-ul" className="dropdown-menu">
                            <li><h5 id="dd-top-text" className="dropdown-item">Select a playlist to add this track:</h5></li>
                            <li><hr className="dropdown-divider"></hr></li>
                            {userPlaylistsArr.map((playlistData) => (
                                <li key={playlistData.playlistId}>
                                    <a id="dd-item" className="dropdown-item" type="button" onClick={(e) => {handleDropDownAdd(playlistData); e.stopPropagation()}}>
                                        {playlistData.playlistTitle}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default TrackResultItem;