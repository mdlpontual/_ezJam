import React from 'react';
import IMG from "../../../../../../assets/images/ImagesHUB";

function Track() {
    return (
        <>
            <tr id="tt-body-row" className="row justify-content-center align-items-center">
                <td id="#-col" className="col-1 d-flex justify-content-start align-items-center">00</td>
                <td id="thumbnail-col" className="col-auto d-flex justify-content-center align-items-center">
                    <img src={IMG.placeHolders} alt="empty" height="40px"/>
                </td>
                <td id="title-col" className="col d-flex flex-column justify-content-center align-items-start">
                    <h6>Aquatic Mouth Dance </h6>
                    <p>Red Hot Chili Peppers</p>
                </td>
                <td id="album-col" className="col-3 d-flex justify-content-start align-items-center">
                    <p>Unlimited Love</p>
                </td>
                <td id="status-col" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={IMG.savedPNG} alt="" width="25px"/>
                </td>
                <td id="duration-col" className="col-1 d-flex justify-content-end align-items-center">
                    4:20
                </td>
            </tr>
        </>
    );
}

export default Track;