import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import TopTrack from "./unit_components/TopTrack";

function TopTracksBox({ fetchedArtistTopTracksArray, onPlayButton, playTrack, pauseTrack, accessToken}) {
    return (
        <>
            <div id="top-five-container" className="container-fluid">
                <div id="top-five-row" className="row">
                    <div id="top-five-col" className="col">
                        <h4>Popular:</h4>
                        {fetchedArtistTopTracksArray.map((track, i) => (
                            <TopTrack 
                                topTrack={track} 
                                order={i} 
                                onPlayButton={onPlayButton} 
                                playTrack={playTrack}
                                pauseTrack={pauseTrack}
                                key={track.trackUri} 
                                fetchedArtistTopTracksArray={fetchedArtistTopTracksArray}
                                accessToken={accessToken}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopTracksBox;