import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function EmptyPlaylistsCollection() {
    return (
        <>
            <div id="empty-pl-collection-col" className="col d-flex flex-column justify-content-center align-items-center">
                <img src={IMG.emptyPlaylistCollectionPlaceHolder} alt="no results" width="150px"/>
                <h2 id="nores">You have no Playlists yet!</h2>
                <p>Click at the "+" button at the top to begin your ezJam experience!</p>
            </div>
        </>
    );
}

export default EmptyPlaylistsCollection;