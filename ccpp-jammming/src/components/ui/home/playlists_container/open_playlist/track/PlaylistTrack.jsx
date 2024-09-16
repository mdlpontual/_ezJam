import React from 'react';
import IMG from "../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../hooks/TrackContext";
import useFetchId from "../../../../../../hooks/useFetchId";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";

function PlaylistTrack({ order, playlistTrack, playlistTracksArr, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { currentTrackUri, isPaused } = useTrack(); 

    const uriTrack = playlistTrack.trackUri;
    let uriQueue = [];
    playlistTracksArr.map(track => uriQueue.push(track.trackUri));

    let cover;
    if (playlistTrack.trackCover) {
        cover = playlistTrack.trackCover;
    } else {
        cover = IMG.placeHolders;
    }

    // Handle play/pause toggle
    const handleTogglePlay = () => {
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

    //---------------------------------------------------------------------------------------------------------

    const search = playlistTrack.trackAuthor;
    const albumCurrent = playlistTrack.trackAlbum;

    const { searchArtistResults, searchAlbumResults } = useFetchId({ search, accessToken });
    const { fetchedArtistsArray, fetchedAlbumsArray } = useFetchSearchResults({ searchArtistResults, searchAlbumResults, accessToken });

    const artistContent = fetchedArtistsArray.find(artist => artist.artistName === search);
    const albumContent = fetchedAlbumsArray.find(album => album.albumTitle === albumCurrent);

    //---------------------------------------------------------------------------------------------------------
    
    if(currentTrackUri !== uriTrack) {
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
                                <a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
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
                                <a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
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
                            <a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
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
                            <a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>
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