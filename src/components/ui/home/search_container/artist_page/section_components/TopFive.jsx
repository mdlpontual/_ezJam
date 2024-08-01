import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import TopSong from "./unit_components/TopSong";

function TopFive() {
    return (
        <>
            <div id="top-five-container" className="container-fluid">
                <div id="top-five-row" className="row">
                    <div id="top-five-col" className="col">
                        <h4>Popular:</h4>
                        <TopSong/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopFive;