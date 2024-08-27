import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import Album from "./unit_components/Album";

function DiscographyBox({ /* albumContent */ }) {
    return (
        <>
            <div id="discography-container" className="container-fluid">
                <div id="discography-row" className="row">
                    <div id="discography-col" className="col">
                        <h4>Discography:</h4>
                        <div id="albuns-inner-row" className="row">
                            {/* {albumContent.map((album) => (
                                <Album album={album} key={album.uri}/>
                            ))} */}
                        </div>  
                    </div>
                </div>
            </div>
        </>
    );
}

export default DiscographyBox;