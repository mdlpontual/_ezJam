import React from "react";
import IMG from "../assets/images/ImagesHUB";
import useUserInfo from "../hooks/user_hooks/useUserInfo"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function DropdownAddButton({ dropdownButtonRef, handleDropDownAdd, accessToken }) {
    const { userPlaylistsArr } = useUserInfo({accessToken});

    return (
    <>
        <div id="col-plus" className="dropdown col-1 d-flex justify-content-end align-items-center">
            <div title="Click and Select a Playlist to add Tracks" className="dropdown">
                <button id="plus-dd" ref={dropdownButtonRef} className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.stopPropagation()}>
                    <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                    <img id="plus-icon-green" src={IMG.plus2GreenPNG} alt="plus icon" width="25px"/>
                </button>
                <ul id="dropdown-ul" className="dropdown-menu">
                    <li><h5 id="dd-top-text" className="dropdown-item">Select a playlist to add this track:</h5></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    {userPlaylistsArr.map((playlistData) => (
                        <li key={playlistData.playlistId}>
                            <a id="dd-item" className="dropdown-item" type="button" onClick={(e) => {handleDropDownAdd(playlistData); e.stopPropagation()}}>
                                {playlistData.playlistTitle}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
    );
};

export default DropdownAddButton;
