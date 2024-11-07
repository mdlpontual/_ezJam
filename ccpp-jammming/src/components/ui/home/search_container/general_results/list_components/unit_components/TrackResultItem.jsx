import React, { useRef } from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../../hooks/TrackContext";
import { useAddTrack } from "../../../../../../../hooks/user_hooks/AddTrackContext";
import Equalizer from "../../../../../../../utils/Equalizer";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DropdownAddButton from "../../../../../../../utils/DropdownAddButton";

function TrackResultItem({  artistContent, albumContent, trackContent, 
                            fetchedTracksArray, onArtistClick, onAlbumClick, 
                            onPlayButton, playTrack, pauseTrack, 
                            onTrackClick, isSelected, selectedTracks, userPlaylistsArr, accessToken }) {
    const { currentTrackUri, isPaused } = useTrack(); 
    const { updateTrackToAdd } = useAddTrack();

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

    const dropdownButtonRef = useRef(null); // Reference to dropdown button

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
        //console.log("TrackResultItem - Selected Track IDs:", JSON.stringify(selectedTracksIds)); // This should now log all IDs
    };

    const handleDropDownAdd = (playlistData) => {
        if (selectedTracksIds === 0) {
            updateTrackToAdd(uriTrack, idTrack, playlistData, accessToken);
            //console.log(idTrack);
        } else {
            updateTrackToAdd(uriTrack, selectedTracksIds, playlistData, accessToken);
            //console.log(selectedTracksIds);
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
                    <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                        <div className="drag" draggable="false" onDragStart={handleDragStart}> 
                            <img src={IMG.dragPNG} height="25px" />
                        </div>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <img id="cover-img" src={trackCover} height="40px"/>
                        <a id="play-button" type="button" onClick={(e) => {onPlayButton(uriTrack, uriQueue); e.stopPropagation()}}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="20px"/>
                        </a>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{trackContent.trackTitle}</h5>
                        <p><a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>{trackContent.trackAuthor}</a></p>
                    </div>
                    <div id="col-album" className="col-3 d-flex justify-content-start align-items-center">
                        <p><a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>{trackContent.trackAlbum}</a></p>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                    </div>
                    <DropdownAddButton dropdownButtonRef={dropdownButtonRef} handleDropDownAdd={handleDropDownAdd} accessToken={accessToken}/>      
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
                    <img id="cover-img" src={trackCover} height="40px"/>
                    <a className="col-1 d-flex justify-content-center align-items-center" id="play-button" type="button" onClick={(e) => onPlayButton(handleTogglePlay(e))}>
                        <div className="d-flex justify-content-center align-items-center" id="play-icon">
                            {isPaused ? <img src={IMG.playPNG2Green} alt="play icon" width="22px" /> : <Equalizer />}
                        </div>
                    </a>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{trackContent.trackTitle}</h5>
                    <p><a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>{trackContent.trackAuthor}</a></p>
                </div>
                <div id="col-album" className="col-3 d-flex justify-content-start align-items-center">
                    <p><a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>{trackContent.trackAlbum}</a></p>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                </div>
                <DropdownAddButton dropdownButtonRef={dropdownButtonRef} handleDropDownAdd={handleDropDownAdd} accessToken={accessToken}/>     
            </div> 
        </>
    );
}

export default TrackResultItem;