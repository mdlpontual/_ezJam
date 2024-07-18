import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";

function TrackRow(){
    return (
        <>
            <div id="track-container" className="container">
                <div id="track-row" className="row gap-2 d-flex justify-content-center align-items-center">
                    <div id="number-col" className="col-1">
                        <h6>1</h6>
                    </div>
                    <div id="cover-col" className="col-1">
                        <img src={IMG.placeHolders} alt="" width="40px"/>
                    </div>
                    <div id="title-col" className="col">
                        <h5>Aquatic Mouth Dance</h5>
                        <h6>Red Hot Chili Peppers</h6>
                    </div>
                    <div id="album-col" className="col-3">
                        <h6>Unlimited Love</h6>
                    </div>
                    <div id="dur-col" className="col-1 align-items-end">
                        <h6>4:21</h6>
                    </div>
                </div>
                <div id="track-row" className="row gap-2 d-flex justify-content-center align-items-center">
                    <div id="number-col" className="col-1">
                        <h6>1</h6>
                    </div>
                    <div id="cover-col" className="col-1">
                        <img src={IMG.placeHolders} alt="" width="40px"/>
                    </div>
                    <div id="title-col" className="col">
                        <h5>Aquatic Mouth Dance</h5>
                        <h6>Red Hot Chili Peppers</h6>
                    </div>
                    <div id="album-col" className="col-3">
                        <h6>Unlimited Love</h6>
                    </div>
                    <div id="dur-col" className="col-1 align-items-end">
                        <h6>4:21</h6>
                    </div>
                </div>
                <div id="track-row" className="row gap-2 d-flex justify-content-center align-items-center">
                    <div id="number-col" className="col-1">
                        <h6>1</h6>
                    </div>
                    <div id="cover-col" className="col-1">
                        <img src={IMG.placeHolders} alt="" width="40px"/>
                    </div>
                    <div id="title-col" className="col">
                        <h5>Aquatic Mouth Dance</h5>
                        <h6>Red Hot Chili Peppers</h6>
                    </div>
                    <div id="album-col" className="col-3">
                        <h6>Unlimited Love</h6>
                    </div>
                    <div id="dur-col" className="col-1 align-items-end">
                        <h6>4:21</h6>
                    </div>
                </div>
                <div id="track-row" className="row gap-2 d-flex justify-content-center align-items-center">
                    <div id="number-col" className="col-1">
                        <h6>1</h6>
                    </div>
                    <div id="cover-col" className="col-1">
                        <img src={IMG.placeHolders} alt="" width="40px"/>
                    </div>
                    <div id="title-col" className="col">
                        <h5>Aquatic Mouth Dance</h5>
                        <h6>Red Hot Chili Peppers</h6>
                    </div>
                    <div id="album-col" className="col-3">
                        <h6>Unlimited Love</h6>
                    </div>
                    <div id="dur-col" className="col-1 align-items-end">
                        <h6>4:21</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackRow;

/*
<table>
                        <thead>
                            <tr>
                                <th colSpan={2}>#</th>
                                <th>title</th>
                                <th>album/collection</th>
                                <th><img src={IMG.clockPNG} alt="" width="13px"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td><img src={IMG.placeHolders} alt="is saved icon" width="40px"/></td>
                                <td>
                                    <h5>Aquatic Mouth Dance</h5>
                                    <h6>Red Hot Chili Peppers</h6>
                                </td>
                                <td>Unlimited Love</td>
                                <td>4:21</td>
                            </tr>
                            <tr>
                                <th>1</th>
                                <td><img src={IMG.placeHolders} alt="is saved icon" width="40px"/></td>
                                <td>
                                    <h5>Aquatic Mouth Dance</h5>
                                    <h6>Red Hot Chili Peppers</h6>
                                </td>
                                <td>Unlimited Love</td>
                                <td>4:21</td>
                            </tr>
                            <tr>
                                <th>1</th>
                                <td><img src={IMG.placeHolders} alt="is saved icon" width="40px"/></td>
                                <td>
                                    <h5>Aquatic Mouth Dance</h5>
                                    <h6>Red Hot Chili Peppers</h6>
                                </td>
                                <td>Unlimited Love</td>
                                <td>4:21</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={4}>
                                    <div className="row">
                                        <button id="" className="btn btn-primary btn-lg">Save Playlist</button>
                                    </div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
*/