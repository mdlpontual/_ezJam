import React from "react";
import ArtistResults from "./list_components/ArtistResults";
import AlbumResults from "./list_components/AlbumResults";
import SongResults from "./list_components/SongResults";

function GeneralResultsPage({ searchArtistResults, searchAlbumResults, searchTrackResults, artistContent, albumContent, songContent, onArtistClick, onAlbumClick }) {
    return (
        <>
            <div id="gen-results-container" className="container-fluid">
                <div id="gen-results-artists" className="row">
                    <div id="gen-results-artists-col" className="col">
                        {/* <ArtistResults 
                            searchArtistResults={searchArtistResults}
                            searchAlbumResults={searchAlbumResults}
                            searchTrackResults={searchTrackResults}
                            artistContent={artistContent} 
                            albumContent={albumContent} 
                            songContent={songContent} 
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}/> */}
                    </div>
                </div>
                <div id="gen-results-albuns" className="row">
                    <div id="gen-results-albuns-col" className="col">
                        {/* <AlbumResults 
                            searchArtistResults={searchArtistResults}
                            searchAlbumResults={searchAlbumResults}
                            searchTrackResults={searchTrackResults}
                            artistContent={artistContent} 
                            albumContent={albumContent} 
                            songContent={songContent} 
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}/> */}
                    </div>
                </div>
                <div id="gen-results-songs" className="row">
                    <div id="gen-results-songs-col" className="col">
                        {/* <SongResults 
                            searchArtistResults={searchArtistResults}
                            searchAlbumResults={searchAlbumResults}
                            searchTrackResults={searchTrackResults}
                            artistContent={artistContent} 
                            albumContent={albumContent} 
                            songContent={songContent} 
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}/> */}
                    </div>
                </div>
            </div>
        </>
    );       
}

export default GeneralResultsPage;