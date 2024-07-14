import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import TrackTable from "./TrackTable";

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
                <div id="o-pl-body-row" className="row flex-grow-1">
                    <TrackTable />
                </div>
            </div>
        </>
    );
}

export default OpenPlaylist;