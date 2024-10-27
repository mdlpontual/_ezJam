import React from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";

function EmptyPlaylistPage() {
  return (
    <>
        <div id="empty-pl-container" className="container d-flex flex-column justify-content-center align-items-center">
            <div id="empty-pl-row"className="row justify-content-center align-items-center">
                <div id="empty-pl-col" className="col d-flex flex-column justify-content-center align-items-center">
                    <img src={IMG.emptyPlaylistPlaceHolder} alt="empty playlist" width="100px"/>
                    <h3>your playlist is empty.</h3>
                    <h6>search for tracks in the next box, then drag or select them to a playlist and start your jam!</h6>
                </div>
            </div>
        </div>
    </>
  );
};

export default EmptyPlaylistPage;
