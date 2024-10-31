import React, { useRef } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../hooks/TrackContext";
import { useAddTrack } from "../../../../../hooks/user_hooks/AddTrackContext";
import Equalizer from "../../../../../utils/Equalizer";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AlbumTracks({ trackContent, fetchedAlbumTracksArray, 
                        onPlayButton, playTrack, pauseTrack, 
                        onTrackClick, isSelected, selectedTracks, userPlaylistsArr, accessToken }) {
    const { currentTrackUri, isPaused } = useTrack(); 
    const { updateTrackToAdd } = useAddTrack();

    const uriTrack = trackContent.trackUri;
    const idTrack = trackContent.trackId;
    let uriQueue = [];
    fetchedAlbumTracksArray.map(track => uriQueue.push(track.trackUri));
    const selectedTracksIds = selectedTracks.length > 0 ? selectedTracks.map(track => track.substring(14)) : idTrack;

    const dropdownButtonRef = useRef(null); // Reference to dropdown button

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    
    // Handle play/pause toggle
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
            updateTrackToAdd(uriTrack, idTrack, playlistData, accessToken);
            console.log(idTrack);
        } else {
            updateTrackToAdd(uriTrack, selectedTracksIds, playlistData, accessToken);
            console.log(selectedTracksIds);
        }

        // Close the dropdown after selection
        if (dropdownButtonRef.current) {
            const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownButtonRef.current);
            if (dropdownInstance) {
                dropdownInstance.hide();
            }
        }
    };

    
    if(currentTrackUri !== uriTrack) {
        return (
            <>
                <div id="songs-inner-row" className={`row ${isSelected ? 'selected-track2' : ''}`} draggable="true" onDragStart={handleDragStart} onClick={onTrackClick}>
                    <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                        <h5 id="number-icon">{trackContent.trackNumber}</h5>
                        <div id="drag-button" className="drag" draggable="false" onDragStart={handleDragStart}> 
                            <img id="drag-icon" src={IMG.dragPNG} height="25px" />
                        </div>
                    </div>
                    <div id="col-play" className="col-1 d-flex justify-content-center align-items-center">
                        <a id="play-button" type="button" onClick={() => onPlayButton(uriTrack, uriQueue)}>
                            <img id="play-icon" src={IMG.play3PNG} alt="play icon" width="30px"/>
                        </a>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{trackContent.trackTitle}</h5>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                    </div>
                    <div id="col-plus" className="dropdown col-1 d-flex justify-content-end align-items-center">
                        <div className="dropdown">
                            <button id="plus-dd" ref={dropdownButtonRef} className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.stopPropagation()}>
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
                <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                        <h5 id="number-icon">{trackContent.trackNumber}</h5>
                        <div id="drag-button" className="drag" draggable="false" onDragStart={handleDragStart}> 
                            <img id="drag-icon" src={IMG.greenDragPNG} height="25px" />
                        </div>
                    </div>
                    <div id="col-play" className="col-1 d-flex justify-content-center align-items-center">
                        <a className="col-1 d-flex justify-content-center align-items-center" id="play-button" type="button" onClick={() => onPlayButton(handleTogglePlay)}>
                            <div className="d-flex justify-content-center align-items-center" id="play-icon">
                                {isPaused ? <img src={IMG.play3PNGGreen} alt="play icon" width="30px" /> : <Equalizer />}
                            </div>
                        </a>
                    </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{trackContent.trackTitle}</h5>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                </div>
                <div id="col-plus" className="dropdown col-1 d-flex justify-content-end align-items-center">
                        <div className="dropdown">
                            <button id="plus-dd" ref={dropdownButtonRef} className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.stopPropagation()}>
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

export default AlbumTracks;