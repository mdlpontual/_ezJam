import React from "react";
import ArtistResultsBox from "./list_components/ArtistResultsBox";
import AlbumResultsBox from "./list_components/AlbumResultsBox";
import TrackResultsBox from "./list_components/TrackResultsBox";

function GeneralResultsPage({ searchArtistResults, searchAlbumResults, searchTrackResults, onArtistClick, onAlbumClick, onPlayButton, playTrack, pauseTrack, userPlaylistsArr, accessToken }) {
    return (
        <>
            <div id="gen-results-container" className="container-fluid">
                <div id="gen-results-artists" className="row">
                    <div id="gen-results-artists-col" className="col">
                        <ArtistResultsBox 
                            searchArtistResults={searchArtistResults}
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}
                            onPlayButton={onPlayButton}
                            userPlaylistsArr={userPlaylistsArr}
                            accessToken={accessToken}/>
                    </div>
                </div>
                <div id="gen-results-albuns" className="row">
                    <div id="gen-results-albuns-col" className="col">
                        <AlbumResultsBox 
                            searchArtistResults={searchArtistResults}
                            searchAlbumResults={searchAlbumResults}
                            searchTrackResults={searchTrackResults}
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}
                            onPlayButton={onPlayButton}
                            userPlaylistsArr={userPlaylistsArr}
                            accessToken={accessToken}/>
                    </div>
                </div>
                <div id="gen-results-songs" className="row">
                    <div id="gen-results-songs-col" className="col">
                        <TrackResultsBox 
                            searchArtistResults={searchArtistResults}
                            searchAlbumResults={searchAlbumResults}
                            searchTrackResults={searchTrackResults}
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}
                            onPlayButton={onPlayButton}
                            playTrack={playTrack}
                            pauseTrack={pauseTrack}
                            userPlaylistsArr={userPlaylistsArr}
                            accessToken={accessToken}/>
                    </div>
                </div>
            </div>
        </>
    );       
}

export default GeneralResultsPage;