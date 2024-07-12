import React from "react";
import IMG from "../../../assets/images/ImagesHUB";
import AboutPopover from "../../../utils/AboutPopover";  

function HomeHeader() {
    const stringOne = "Jammming - a Codecademy Practice Project";
    const stringTwo = "copyright mdlpontual - 2024";
    return (
        <>  
            <figure id="home-logo" className="col-3">
                <div id="jam-logo" className="col">
                    <img src={IMG.jammmingLogo} alt="jammming logo" height='70px'/>  
                </div>
                <div id="spotify-logo" className="col">
                    <p id="with-text">with</p>
                    <a href="https://open.spotify.com/intl-pt">
                        <img src={IMG.spotifyLogo} alt="spotify logo" width='40px' />
                    </a>  
                </div>
            </figure>
            <nav id="navbar" className="col-9">
                <ul>
                <li><AboutPopover content="copyright mdlpontual - 2024"/></li>
                    <li><a href="">Logoff</a></li>
                </ul>
            </nav>
        </>
    )
}

export default HomeHeader;