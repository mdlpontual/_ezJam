import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import TopSong from "./unit_components/TopSong";

function TopFive({ songsResults }) {
    //The sort() function sorts the songsResults array based on the popularity attribute in descending order (b.popularity - a.popularity).
    const sortedSongs = songsResults.sort((a, b) => b.popularity - a.popularity).filter((song, idx) => idx < 10);
    const count = 0;

    return (
        <>
            <div id="top-five-container" className="container-fluid">
                <div id="top-five-row" className="row">
                    <div id="top-five-col" className="col">
                        <h4>Popular:</h4>
                        {sortedSongs.map((song, i) => (
                            <TopSong song={song} order={i} key={song.uri}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopFive;