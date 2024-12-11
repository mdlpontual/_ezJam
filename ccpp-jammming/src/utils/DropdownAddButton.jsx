import React, { useState } from "react";
import IMG from "../assets/images/ImagesHUB";
import useUserInfo from "../hooks/user_hooks/useUserInfo";

function DropdownAddButton({ dropdownButtonRef, handleDropDownAdd, accessToken }) {
    const { userPlaylistsArr } = useUserInfo({ accessToken });
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent outside click propagation
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => setIsMenuOpen(false); // Close menu

    // Close menu on outside click or Escape key
    React.useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(e.target)) {
                closeMenu();
            }
        };
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        };
        document.addEventListener("click", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [dropdownButtonRef]);

    // Update handleDropDownAdd to close the menu after selection
    const handleItemClick = (playlistData) => {
        handleDropDownAdd(playlistData); // Call the passed-in function
        closeMenu(); // Close the dropdown menu
    };

    return (
        <>
            <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                <div id="custom-dropdown" title="Click and Select a Playlist to add Tracks" className="container-fluid justify-content-center align-items-center custom-dropdown" ref={dropdownButtonRef}>
                    <button id="plus-dd" className="row d-flex justify-content-center align-items-center btn" type="button" onClick={toggleMenu}>
                        <img id="plus-icon" className="col justify-content-center align-items-center" src={IMG.plus2PNG} alt="plus icon" width="25px" />
                        <img id="plus-icon-green" className="col justify-content-center align-items-center" src={IMG.plus2GreenPNG} alt="plus icon" width="25px" />
                    </button>
                    {isMenuOpen && (
                        <div id="modalOver" className="modal-overlay">
                            <div id="modalContent" className="modal-content" ref={dropdownButtonRef}>
                                <h5 id="modalHead" className="modal-header">Select a playlist to add this track:</h5>
                                <ul id="dropdown-ul">
                                    {userPlaylistsArr.map((playlistData) => (
                                        <li id="list-item" key={playlistData.playlistId}>
                                            <button
                                                id="dd-item"
                                                className="custom-menu-item"
                                                type="button"
                                                onClick={(e) => {e.stopPropagation(); handleItemClick(playlistData);}}>
                                                    {playlistData.playlistTitle}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <button id="closeButt" className="close-modal-btn" onClick={closeMenu}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DropdownAddButton;


/* import React, { useState } from "react";
import IMG from "../assets/images/ImagesHUB";
import useUserInfo from "../hooks/user_hooks/useUserInfo";

function DropdownAddButton({ dropdownButtonRef, handleDropDownAdd, accessToken }) {
    const { userPlaylistsArr } = useUserInfo({ accessToken });
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent outside click propagation
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => setIsMenuOpen(false); // Close menu

    // Close menu on outside click
    React.useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(e.target)) {
                closeMenu();
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [dropdownButtonRef]);

    // Update handleDropDownAdd to close the menu after selection
    const handleItemClick = (playlistData) => {
        handleDropDownAdd(playlistData); // Call the passed-in function
        closeMenu(); // Close the dropdown menu
    };

    return (
        <>
            <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                <div id="custom-dropdown" title="Click and Select a Playlist to add Tracks" className="container-fluid justify-content-center align-items-center custom-dropdown" ref={dropdownButtonRef}>
                    <button id="plus-dd" className="row d-flex justify-content-center align-items-center btn" type="button" onClick={toggleMenu}>
                        <img id="plus-icon" className="col justify-content-center align-items-center" src={IMG.plus2PNG} alt="plus icon" width="25px" />
                        <img id="plus-icon-green" className="col justify-content-center align-items-center" src={IMG.plus2GreenPNG} alt="plus icon" width="25px" />
                    </button>
                    {isMenuOpen && (
                        <ul id="dropdown-ul" className="container-fluid">
                            <li>
                                <h5 id="dd-top-text" className="custom-menu-item">
                                    Select a playlist to add this track:
                                </h5>
                            </li>
                            <li>
                                <hr className="custom-menu-divider" />
                            </li>
                            {userPlaylistsArr.map((playlistData) => (
                                <li key={playlistData.playlistId}>
                                    <button 
                                        id="dd-item" 
                                        className="custom-menu-item" 
                                        type="button" 
                                        onClick={(e) => {handleDropDownAdd(playlistData); e.stopPropagation(); handleItemClick(playlistData);}}>
                                            {playlistData.playlistTitle}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default DropdownAddButton; */