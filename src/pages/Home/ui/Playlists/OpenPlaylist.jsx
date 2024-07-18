import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackRow from "./TrackRow";

function OpenPlaylist() {
    return(
        <>
            <div id="o-pl-container" className="container h-100 d-flex flex-column">
                <div id="o-pl-header-row" className="row gap-3">
                    <div className="col-auto">
                        <img src={IMG.gobackPNG} alt="go back" width="25px"/>
                    </div>
                    <div className="col">
                        <h3>Progorola</h3>
                    </div>
                    <div className="col-auto">
                        <img src={IMG.pencilPNG} alt="to edit icon" width="30px"/>
                    </div>
                    <div className="col-auto">
                        <img src={IMG.sharePNG} alt="to share icon" width="30px"/>
                    </div>
                    <div className="col-auto">
                        <img src={IMG.trashBinPNG} alt="to delete icon" width="30px"/>
                    </div>
                </div>
                <div id="track-top-label" className="row d-flex justify-content-center align-items-center gap-2">
                    <div className="col-1">
                        <h6>#</h6>
                    </div>
                    <div className="col-1">
                        
                    </div>
                    <div className="col">
                        <h6>title</h6>
                    </div>
                    <div className="col-3">
                        <h6>album</h6>
                    </div>
                    <div className="col-1 justify-content-end">
                        <img src={IMG.clockPNG} alt="" width="15px"/>
                    </div>
                </div>
                <div id="o-pl-body-row" className="row flex-grow-1">
                    <TrackRow />
                </div>
            </div>
        </>
    );
}

export default OpenPlaylist;