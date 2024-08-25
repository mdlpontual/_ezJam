import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function Album({ album }) {
    return (
        <>
            <div id="album-thumbnail" className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                <img src={album.cover} alt="album cover"/>
                <h6>{album.album}</h6>
                <p>{album.year} - {album.albumType}</p>
            </div>
        </>
    );
}

export default Album;