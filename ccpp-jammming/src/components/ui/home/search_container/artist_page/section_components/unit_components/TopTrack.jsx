import React, { useRef } from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../../hooks/TrackContext";
import { useAddTrack } from "../../../../../../../hooks/user_hooks/AddTrackContext";
import Equalizer from "../../../../../../../utils/Equalizer"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DropdownAddButton from "../../../../../../../utils/DropdownAddButton";

function TopTrack({ topTrack, order, onPlayButton, 
                    playTrack, pauseTrack, fetchedArtistTopTracksArray, 
                    onTrackClick, isSelected, selectedTracks, userPlaylistsArr, accessToken }) {
    const { currentTrackUri, isPaused } = useTrack(); 
    const { updateTrackToAdd } = useAddTrack();

    const uriTrack = topTrack.trackUri;
    const idTrack = topTrack.trackId;
    let uriQueue = [];
    fetchedArtistTopTracksArray.map(track => uriQueue.push(track.trackUri));
    const selectedTracksIds = selectedTracks.length > 0 ? selectedTracks.map(track => track.substring(14)) : idTrack;

    const dropdownButtonRef = useRef(null); // Reference to dropdown button

    let cover;
    if (topTrack.trackCover) {
        cover = topTrack.trackCover;
    } else {
        cover = IMG.placeHolders;
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

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    // Handle drag start
    const handleDragStart = (event) => {
        event.dataTransfer.setData('trackUri', uriTrack);
        event.dataTransfer.setData('trackIds', JSON.stringify(selectedTracksIds)); // Convert array to JSON string
        event.dataTransfer.setData('accessToken', accessToken);
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
                <div id="songs-inner-row" className={`row ${isSelected ? 'selected-track3' : ''}`} draggable="true" onDragStart={handleDragStart} onClick={onTrackClick}>
                    <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                        <h5>{order + 1}</h5>
                        <div id="drag-button" className="drag" draggable="false" onDragStart={handleDragStart}> 
                            <img id="drag-icon" src={IMG.dragPNG} height="25px" />
                        </div>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <div id="cover-img" className="cover">
                            <img src={cover} height="40px" />
                        </div>
                        <a id="play-button" type="button" onClick={(e) => {onPlayButton(uriTrack, uriQueue); e.stopPropagation()}}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="25px"/>
                        </a>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{topTrack.trackTitle}</h5>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(topTrack.trackDuration)}</p>
                    </div>
                    <DropdownAddButton dropdownButtonRef={dropdownButtonRef} handleDropDownAdd={handleDropDownAdd} accessToken={accessToken}/>     
                </div> 
            </>
        );
    }
    return (
        <>
            <div id="songs-inner-row-green" className={`row ${isSelected ? 'selected-track3' : ''}`} draggable="true" onDragStart={handleDragStart} onClick={onTrackClick}>
                <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                    <h5>{order + 1}</h5>
                    <div id="drag-button" className="drag" draggable="false" onDragStart={handleDragStart}> 
                        <img id="drag-icon" src={IMG.blackDragPNG} height="25px" />
                    </div>
                </div>
                <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                    <div id="cover-img" className="cover">
                        <img src={cover} height="40px" />
                    </div>
                    <a className="col-1 d-flex justify-content-center align-items-center" id="play-button" type="button" onClick={(e) => onPlayButton(handleTogglePlay(e))}>
                        <div className="d-flex justify-content-center align-items-center" id="play-icon">
                            {isPaused ? <img src={IMG.playPNG2Green} alt="play icon" width="25px" /> : <Equalizer />}
                        </div>
                    </a>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{topTrack.trackTitle}</h5>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(topTrack.trackDuration)}</p>
                </div>
                <DropdownAddButton dropdownButtonRef={dropdownButtonRef} handleDropDownAdd={handleDropDownAdd} accessToken={accessToken}/>             
            </div> 
        </>
    );
}

export default TopTrack;