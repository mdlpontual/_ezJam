import React from "react";
import PlaylistRow from "./PlaylistRow";
import IMG from "../../../../assets/images/ImagesHUB";

function UsersPlaylists(){
    return(
        <>
            <div id="containerrr" className="container d-flex flex-column">
                <div id="rowOne" className="row d-flex flex-grow-1 align-items-center"> 
                    <div className="col d-flex flex-column justify-content-around h-100 align-items-center p-0 m-0"><img src={IMG.savedCheckmark} alt="" width="40px"/><img src={IMG.savedCheckmark} alt="" width="40px"/></div>
                    <div className="col"><h6>col</h6></div>
                    <div className="col"><img src={IMG.savedCheckmark} alt="" width="40px"/></div>
                    <div className="col"><h6>col<img src={IMG.savedCheckmark} alt="" width="40px"/>col</h6></div>
                </div>
            </div>
        </>
    );
}

export default UsersPlaylists;




/*
<div id="containerrr" className="container d-flex flex-column">
                <div id="rowOne" className="row"> 
                    <div className="col"><img src={IMG.savedCheckmark} alt="" width="40px"/></div>
                </div>
                <div id="rowTwo" className="row flex-grow-1"> 
                    <div className="col"><h6>col</h6></div>
                    <div className="col"><img src={IMG.savedCheckmark} alt="" width="40px"/></div>
                    <div className="col"><h6>col<img src={IMG.savedCheckmark} alt="" width="40px"/>col</h6></div>
                </div>
            </div>


<div id="containerrr" className="container"> <h1>container</h1>
                <div className="row"> <h3>rows</h3>
                    <div className="col"><img src={IMG.savedCheckmark} alt="" width="40px"/></div>
                    <div className="col"><h6>col<img src={IMG.savedCheckmark} alt="" width="40px"/>col</h6></div>
                    <div className="col"><h6>col</h6></div>
                </div>
                <div className="row"> <h3>rows</h3>
                    <div className="col"><h6>col</h6></div>
                    <div className="col"><img src={IMG.savedCheckmark} alt="" width="40px"/></div>
                    <div className="col"><h6>col<img src={IMG.savedCheckmark} alt="" width="40px"/>col</h6></div>
                </div>
                <div className="row"> <h3>rows</h3>
                    <div className="col"><h6>col<img src={IMG.savedCheckmark} alt="" width="40px"/>col</h6></div>
                    <div className="col"><h6>col</h6></div>
                    <div className="col"><img src={IMG.savedCheckmark} alt="" width="40px"/></div>
                </div>
            </div>*/


/*function UsersPlaylists(){
    return(
        <>
            <div id="user-playlists-container" className="container">
                <div id="user-playlists-header" className="row">
                    <div id="pl-header-title" className="col-auto">
                        <h3>(User's) Playlists:</h3>
                    </div>
                    <div id="pl-add-button" className="col">
                        <img src={IMG.plusSymbol} alt="" height="40px" />
                    </div>
                </div>
                <div id="user-playlists-body" className="row">
                    <div id="num-col" className="col-1">

                    </div>
                    <div id="rows-col" className="col">
                        <ol id="pl-ol">
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                            <li id="pl-row-item"><PlaylistRow/></li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}*/