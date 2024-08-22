import React from "react";
import ArtistResults from "./list_components/ArtistResults";
import AlbumResults from "./list_components/AlbumResults";
import SongResults from "./list_components/SongResults";

function GeneralResultsPage({ artistsResults, albumResults, songsResults, artistContent, albumContent, songContent, onArtistClick, onAlbumClick }) {
    return (
        <>
            <div id="gen-results-container" className="container-fluid">
                <div id="gen-results-artists" className="row">
                    <div id="gen-results-artists-col" className="col">
                        <ArtistResults 
                            artistsResults={artistsResults} 
                            albumResults={albumResults} 
                            songsResults={songsResults}
                            artistContent={artistContent} 
                            albumContent={albumContent} 
                            songContent={songContent} 
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}/>
                    </div>
                </div>
                <div id="gen-results-albuns" className="row">
                    <div id="gen-results-albuns-col" className="col">
                        <AlbumResults 
                            artistsResults={artistsResults} 
                            albumResults={albumResults} 
                            songsResults={songsResults}
                            artistContent={artistContent} 
                            albumContent={albumContent} 
                            songContent={songContent} 
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}/>
                    </div>
                </div>
                <div id="gen-results-songs" className="row">
                    <div id="gen-results-songs-col" className="col">
                        <SongResults 
                            artistsResults={artistsResults} 
                            albumResults={albumResults} 
                            songsResults={songsResults}
                            artistContent={artistContent} 
                            albumContent={albumContent} 
                            songContent={songContent} 
                            onArtistClick={onArtistClick}
                            onAlbumClick={onAlbumClick}/>
                    </div>
                </div>
            </div>
        </>
    );       
}

export default GeneralResultsPage;

/*
artistContent={artistContent}
albumContent={albumContent}
songContent={songContent}
*/