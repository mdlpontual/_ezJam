import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import Track from "./track/Track";

function OpenPlaylist() {
    return (
        <>
            <div id="open-pl-container" className="container-fluid d-flex flex-column">
                <header id="open-pl-header" className="row">
                    <div id="go-back-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.gobackPNG} alt="go back button" width="25px"/>
                    </div>
                    <div id="title-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <h4 className="d-flex align-items-center h-100">Progorola</h4>
                    </div>
                    <div id="checkmark-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img id="saved-icon" src={IMG.savedPNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="blank-col" className="col"></div>
                    <div id="edit-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.pencilPNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="share-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.sharePNG} alt="saved icon" width="27px"/>
                    </div>
                    <div id="delete-button-col" className="col-auto d-flex flex-column justify-content-center align-items-center">
                        <img src={IMG.trashBinPNG} alt="saved icon" width="27px"/>
                    </div>
                </header>
                <main id="open-pl-main" className="row flex-grow-1">
                    <table id="track-table" className="col">
                        <thead id="track-table-header" className="container-fluid d-flex flex-column">
                            <tr id="tt-header-row" className="row justify-content-center align-items-center">
                                <td id="#-col" className="col-1 d-flex justify-content-start align-items-end">#</td>
                                <td id="thumbnail-col" className="col-auto d-flex justify-content-center align-items-end">
                                    <img src={IMG.placeHolders} alt="empty" height="40px"/>
                                </td>
                                <td id="title-col" className="col d-flex justify-content-start align-items-end">title</td>
                                <td id="album-col" className="col-3 d-flex justify-content-start align-items-end">album</td>
                                <td id="status-col" className="col-1 d-flex justify-content-center align-items-end">status</td>
                                <td id="duration-col" className="col-1 d-flex justify-content-end align-items-end">
                                    <img src={IMG.clockPNG} alt="duration" width="15px"/>
                                </td>
                            </tr>
                        </thead>
                        <tbody id="track-table-body" className="container-fluid d-flex flex-column">
                            <div id="overflow-row" className="row">
                                <div id="overflow-col" className="col">
                                    <Track/>
                                    
                                </div>
                            </div>
                        </tbody>
                    </table>
                </main>
                <footer id="open-pl-footer" className="row">
                    <div id="save-button-col" className="col d-flex flex-column justify-content-start align-items-center">
                        <button id="save-button" className="btn btn-primary btn-lg">Save to Spotify</button>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default OpenPlaylist;