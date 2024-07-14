import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";

function TrackTable(){
    return (
        <>
            <div id="track-tb-container" className="container">
                <div id="track-tb-row" className="row">
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
                </div>
            </div>
        </>
    )
}

export default TrackTable;