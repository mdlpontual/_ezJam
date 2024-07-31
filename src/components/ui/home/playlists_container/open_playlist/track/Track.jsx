import React from 'react';
import IMG from "../../../../../../assets/images/ImagesHUB";

function Track() {
    return (
        <>
            <div id="single-track-container" className="container-fluid">
                <div id="single-track-row" className="row">
                    <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                        <h5 id="number-icon">2</h5>
                        <img id="drag-icon" src={IMG.dragPNG} alt="drag icon" width="25px"/>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <img src={IMG.placeHolders} height="40px"/>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>Aquatic Mouth Dance</h5>
                        <p>Red Hot Chilli Peppers</p>
                    </div>
                    <div id="col-album" className="col-3 d-flex justify-content-start align-items-center">
                        <p>Unlimited Love</p>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>4:20</p>
                    </div>
                    <div id="col-saved" className="col-1 d-flex justify-content-center align-items-center">
                        <img id="saved-icon" src={IMG.savedPNG} height="20px" />
                        <img id="opt-icon" src={IMG.optionsPNG} alt="options button" height="20px"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Track;