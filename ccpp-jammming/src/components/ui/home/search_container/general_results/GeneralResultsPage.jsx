import React from "react";
import ArtistResults from "./list_components/ArtistResults";
import AlbumResults from "./list_components/AlbumResults";
import TrackResults from "./list_components/TrackResults";

function GeneralResultsPage({ searchArtistResults, searchAlbumResults, searchTrackResults, onArtistClick, onAlbumClick, accessToken }) {
    return (
        <>
            <div id="gen-results-container" className="container-fluid">
                <div id="gen-results-artists" className="row">
                    <div id="gen-results-artists-col" className="col">
                        <ArtistResults 
                            searchArtistResults={searchArtistResults} 
                            onArtistClick={onArtistClick}
                            accessToken={accessToken}/>
                    </div>
                </div>
                <div id="gen-results-albuns" className="row">
                    <div id="gen-results-albuns-col" className="col">
                        <AlbumResults 
                            searchArtistResults={searchArtistResults}
                            searchAlbumResults={searchAlbumResults}
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}
                            accessToken={accessToken}/>
                    </div>
                </div>
                <div id="gen-results-songs" className="row">
                    <div id="gen-results-songs-col" className="col">
                        <TrackResults 
                            searchArtistResults={searchArtistResults}
                            searchAlbumResults={searchAlbumResults}
                            searchTrackResults={searchTrackResults}
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}
                            accessToken={accessToken}/>
                    </div>
                </div>
            </div>
        </>
    );       
}

export default GeneralResultsPage;