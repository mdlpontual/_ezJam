import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Albuns({ album }) {
    return (
        <>
            <div id="albuns-inner-row" className="row">
                <div id="album-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={album.cover} alt="album cover" height="55px"/>
                </div>
                <div id="album-title" className="col d-flex flex-column justify-content-center align-items-start">
                    <h5>{album.album}</h5>
                    <p>{album.year} - {album.artist}</p>
                </div>
            </div>  
        </>
    );
}

export default Albuns;