import React from "react";
import ArtistResults from "./list_components/ArtistResults";
import AlbumResults from "./list_components/AlbumResults";
import SongResults from "./list_components/SongResults";

function GeneralResultsPage({ artistsResults, albumResults, songsResults, onArtistClick, onAlbumClick }) {
    return (
        <>
            <div id="gen-results-container" className="container-fluid">
                <div id="gen-results-artists" className="row">
                    <div id="gen-results-artists-col" className="col">
                        <ArtistResults artistsResults={artistsResults} onArtistClick={onArtistClick}/>
                    </div>
                </div>
                <div id="gen-results-albuns" className="row">
                    <div id="gen-results-albuns-col" className="col">
                        <AlbumResults albumResults={albumResults} onAlbumClick={onAlbumClick} artistsResults={artistsResults} onArtistClick={onArtistClick}/>
                    </div>
                </div>
                <div id="gen-results-songs" className="row">
                    <div id="gen-results-songs-col" className="col">
                        <SongResults songsResults={songsResults}/>
                    </div>
                </div>
            </div>
        </>
    );       
}

export default GeneralResultsPage;