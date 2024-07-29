import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";

function NoResultsPage() {
    return (
        <>
            <div id="empty-results-col" className="col d-flex flex-column justify-content-center align-items-center">
                <img src={IMG.notFound2PNG} alt="no results" width="200px"/>
                <h2 id="nores">no results</h2>
            </div>
        </>
    );
}

export default NoResultsPage;