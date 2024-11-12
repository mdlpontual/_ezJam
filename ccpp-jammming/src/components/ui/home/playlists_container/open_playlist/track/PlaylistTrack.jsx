import React, { useState, useEffect } from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Equalizer from '../../../../../../utils/Equalizer';
import { useTrack } from "../../../../../../hooks/TrackContext";
import { useSortable } from '@dnd-kit/sortable'; // Importing dnd-kit sortable
import { CSS } from '@dnd-kit/utilities'; // Utility for CSS transformation

function PlaylistTrack({ order, 
                        playlistTrack, playlistTracksArr, 
                        onPlayButton, onArtistClick, onAlbumClick, 
                        playTrack, pauseTrack, 
                        preDeleteTrack, resetTrackSaved, 
                        onTrackClick, isSelected,  
                        selectedTracks, userPlaylistsArr, accessToken }) {
    const { currentTrackUri, isPaused } = useTrack();
    const [isSaved, setIsSaved] = useState(true);  // Track whether the current track is saved

    const uriTrack = playlistTrack.trackUri;
    let uriQueue = [];
    playlistTracksArr.forEach(track => uriQueue.push(track.trackUri));

    const cover = playlistTrack.trackCover || IMG.placeHolders;

    // Use the sortable hook for drag-and-drop
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: playlistTrack.trackUri });

    const style = {
        transform: CSS.Transform.toString(transform ? { ...transform, x: 0 } : transform),
        transition,
    };

    // Handle changes to track (e.g., drag & drop)
    const handleTrackChange = () => {
        setIsSaved(false);  // Mark track as unsaved when changed
    };

    const handleTogglePlay = (e) => {
        e.stopPropagation();
        if (currentTrackUri !== uriTrack) {
            onPlayButton(uriTrack, uriQueue);
        } else {
            isPaused ? playTrack() : pauseTrack();
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        preDeleteTrack(uriTrack, selectedTracks);
    };

    const handleArtistClick = (e) => {
        e.stopPropagation();
        if (playlistTrack.artistId) onArtistClick(playlistTrack, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken);
    };

    const handleAlbumClick = (e) => {
        e.stopPropagation();
        if (playlistTrack.albumId) onAlbumClick(playlistTrack, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken);
    };

    // Helper function to format track duration
    const millisToMinutesAndSeconds = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    // Reset the "isSaved" state when save or discard actions occur
    useEffect(() => {
        if (resetTrackSaved) {
            setIsSaved(true);  // Reset to saved state
        }
    }, [resetTrackSaved]);

    // When track is playing
    let isTrackPlaying = currentTrackUri === uriTrack;

    if (!isTrackPlaying) {
        return (
            <div id="single-track-container" 
                className={`container-fluid ${isSelected ? 'selected-track' : ''}`}   
                ref={setNodeRef} style={style} onClick={onTrackClick}>
                <div id="single-track-row" className="row">
                    <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                        <h6 id="number-icon">{order + 1}</h6>
                        <div className="drag" {...listeners} {...attributes} onMouseUp={handleTrackChange}>
                            <img src={IMG.dragPNG} height="23px" />
                        </div>
                    </div>
                    <div id="col-play" className="col-1 d-flex justify-content-center align-items-center">
                        <a className="col-1 d-flex justify-content-center align-items-center" id="play-button" type="button" onClick={handleTogglePlay}>
                            <img id="play-icon" src={IMG.play3PNG} alt="play icon" width="25px" />
                        </a>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <div className="cover">
                            <img src={cover} height="40px" type="button" onClick={handleAlbumClick}/>
                        </div>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{playlistTrack.trackTitle}</h5>
                        <p id="open-artist-page" type="button" onClick={handleArtistClick}>
                            {playlistTrack.trackAuthor}
                        </p>
                    </div>
                    <div id="col-album" className="col-2 d-flex justify-content-start align-items-center">
                        <p id="open-album-page" type="button" onClick={handleAlbumClick}>
                            {playlistTrack.trackAlbum}
                        </p>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(playlistTrack.trackDuration)}</p>
                    </div>
                    <div id="col-minus" className="col-1 d-flex justify-content-end align-items-center">
                        <a id="delete-track" className="col-1 d-flex justify-content-end align-items-center" type="button" onClick={handleDeleteClick}>
                            <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25px" />
                            <img id="minus-icon-red" src={IMG.minusRedPNG} alt="minus icon" width="25px" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="single-track-container-green" className={`container-fluid ${isSelected ? 'selected-track' : ''}`}   ref={setNodeRef} style={style} onClick={onTrackClick}>
            <div id="single-track-row" className="row">
                <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                    <h6 id="number-icon">{order + 1}</h6>
                    <div className="drag" {...listeners} {...attributes} onMouseDown={handleTrackChange}>
                        <img src={IMG.greenDragPNG} height="23px" />
                    </div>
                </div>
                <div id="col-play" className="col-1 d-flex justify-content-center align-items-center">
                    <a className="col-1 d-flex justify-content-center align-items-center" id="play-button" type="button" onClick={handleTogglePlay}>
                        <div className="d-flex justify-content-center align-items-center" id="play-icon">
                            {isPaused ? <img src={IMG.play3PNGGreen} alt="play icon" width="25px" /> : <Equalizer />}
                        </div>
                    </a>
                </div>
                <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                    <div className="cover">
                        <img src={cover} height="40px" type="button" onClick={handleAlbumClick}/>
                    </div>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{playlistTrack.trackTitle}</h5>
                    <p id="open-artist-page" type="button" onClick={handleArtistClick}>
                        {playlistTrack.trackAuthor}
                    </p>
                </div>
                <div id="col-album" className="col-2 d-flex justify-content-start align-items-center">
                    <p id="open-album-page" type="button" onClick={handleAlbumClick}>
                        {playlistTrack.trackAlbum}
                    </p>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(playlistTrack.trackDuration)}</p>
                </div>
                <div id="col-minus" className="col-1 d-flex justify-content-end align-items-center">
                    <a id="delete-track" className="col-1 d-flex justify-content-end align-items-center" type="button" onClick={handleDeleteClick}>
                        <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25px" />
                        <img id="minus-icon-red" src={IMG.minusRedPNG} alt="minus icon" width="25px" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default PlaylistTrack;