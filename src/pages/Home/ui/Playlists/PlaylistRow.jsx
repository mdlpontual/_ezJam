import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";

function PlaylisRow() {
    return (
        <>
            <div id="pl-row" className="container d-flex align-items-start justify-content-center flex-column">
                <div className="row align-items-center flex-grow-1 w-100 gap-3">
                    <div className="col-auto">
                        <img src={IMG.placeHolders} alt="is saved icon" width="40px"/>
                    </div>
                    <div className="col-auto">
                        <h4>Progorola</h4>
                    </div>
                    <div className="col">
                        <img src={IMG.savedPNG} alt="is saved icon" width="30px"/>
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
            </div>
        </>
    );
}

export default PlaylisRow;