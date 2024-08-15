import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Albuns from "./unit_components/Albuns";

function AlbumResults({ albumResults }) {
    return (
        <>
            <h4>albuns:</h4>
            {albumResults.map(album => (
                <Albuns album={album} key={album.uri}/>
            ))}
        </>
    );
}

export default AlbumResults;