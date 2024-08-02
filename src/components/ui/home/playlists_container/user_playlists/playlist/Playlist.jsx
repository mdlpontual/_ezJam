import React, { useState, useEffect } from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";

function Playlist() {

    return (
        <>
            <div id="single-pl-container" className="container-fluid">
                <div id="single-pl-row" className="row">
                    <div id="checkmark-col" className="col-1 d-flex flex-column justify-content-center align-items-center">
                        <img id="saved-icon" src={IMG.savedPNG} alt="saved icon" width="22px"/>
                        <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="22px"/>
                    </div>
                    <div id="pl-title-col" className="col d-flex flex-column justify-content-center align-items-start">
                        <h4 className="d-flex align-items-center">
                            <a id="pl-name" type="button">Progorola</a>
                        </h4>
                    </div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.pencilPNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.sharePNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.trashBinPNG} alt="saved icon" width="27px"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Playlist;