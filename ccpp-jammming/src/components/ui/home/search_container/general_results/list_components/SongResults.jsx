import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Songs from "./unit_components/Songs";

function SongResults({ songsResults }) {
    return (
        <>
            <h4>songs:</h4>
            {songsResults.map(song => (
                <Songs song={song} key={song.uri}/>
            ))}
        </>
    );
}

export default SongResults;