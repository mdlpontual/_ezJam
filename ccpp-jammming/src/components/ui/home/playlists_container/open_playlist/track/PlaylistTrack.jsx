import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../hooks/TrackContext"; 

function PlaylistTrack({ order, playlistTrack, playlistTracksArr, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { currentTrackUri, currentTrackTitle, currentTrackArtist, currentTrackAlbum, isPaused } = useTrack(); 

    const uriTrack = playlistTrack.trackUri;
    let uriQueue = [];
    playlistTracksArr.forEach(track => uriQueue.push(track.trackUri));

    const cover = playlistTrack.trackCover || IMG.placeHolders;

    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    const millisToMinutesAndSeconds = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    //---------------------------------------------------------------------------------------------------------------------------------------------------

    let isTrackPlaying = false;

    if (!currentTrackUri || !currentTrackTitle || !currentTrackArtist || !currentTrackAlbum) {
        isTrackPlaying = false;
    }  
    
    else if (currentTrackUri === uriTrack) {
        isTrackPlaying = true;
    }

    else if (currentTrackTitle === playlistTrack.trackTitle) {
        isTrackPlaying = true;
    }

    else if (currentTrackTitle.slice(0, 15) === playlistTrack.trackTitle.slice(0, 15)) {
        isTrackPlaying = true;
    }

    else if (currentTrackTitle.toLowerCase() === playlistTrack.trackTitle.toLowerCase()) {
        isTrackPlaying = true;
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------

    if(!isTrackPlaying) {
        return (
            <>
                <div id="single-track-container" className="container-fluid">
                    <div id="single-track-row" className="row">
                        <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                            <h5 id="number-icon">{order + 1}</h5>
                            <a id="play-button" type="button" onClick={() => onPlayButton(uriTrack, uriQueue)}>
                                <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="22px"/>
                            </a>
                        </div>
                        <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                            <div className="col">
                                <img src={cover} height="40px"/>
                            </div>
                        </div>
                        <div id="col-title" className="col d-flex justify-content-start align-items-center">
                            <h5>{playlistTrack.trackTitle}</h5>
                            <p>
                                <a id="open-artist-page" type="button" onClick={() => playlistTrack.artistId && onArtistClick(playlistTrack, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
                                    {playlistTrack.trackAuthor}
                                </a>
                            </p>
                        </div>
                        <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                            <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                        </div>
                        <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                            <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                        </div>
                        <div id="col-album" className="col-2 d-flex justify-content-start align-items-center">
                            <p>
                                <a id="open-album-page" type="button" onClick={() => playlistTrack.albumId && onAlbumClick(playlistTrack, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
                                    {playlistTrack.trackAlbum}
                                </a>
                            </p>
                        </div>
                        <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                            <p>{millisToMinutesAndSeconds(playlistTrack.trackDuration)}</p>
                        </div>
                        <div id="col-saved" className="col-1 d-flex justify-content-center align-items-center">
                            <img id="saved-icon" src={IMG.savedPNG} height="20px" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div id="single-track-container-green" className="container-fluid">
                <div id="single-track-row" className="row">
                    <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                        <a id="play-button" type="button" onClick={() => onPlayButton(handleTogglePlay)}>
                            <img id="play-icon" className="d-flex justify-content-center align-items-center"src={isPaused ? IMG.playPNG2Green : IMG.pausePNG2Green} alt="play icon" width="22px"/>
                        </a>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <div className="col">
                            <img src={cover} height="40px"/>
                        </div>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{playlistTrack.trackTitle}</h5>
                        <p>
                            <a id="open-artist-page" type="button" onClick={() => playlistTrack.artistId && onArtistClick(playlistTrack, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
                                {playlistTrack.trackAuthor}
                            </a>
                        </p>
                    </div>
                    <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                        <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                    </div>
                    <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                        <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                    </div>
                    <div id="col-album" className="col-2 d-flex justify-content-start align-items-center">
                        <p>
                            <a id="open-album-page" type="button" onClick={() => playlistTrack.albumId && onAlbumClick(playlistTrack, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
                                {playlistTrack.trackAlbum}
                            </a>
                        </p>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(playlistTrack.trackDuration)}</p>
                    </div>
                    <div id="col-saved" className="col-1 d-flex justify-content-center align-items-center">
                        <img id="saved-icon" src={IMG.savedPNG} height="20px" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaylistTrack;