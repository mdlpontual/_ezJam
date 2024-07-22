import React from "react";
import IMG from "../../../assets/images/ImagesHUB";

function LoginButtonBox() {
    return (
        <>
            <div id="button-box-container" className="container">
                <div id="logo-row" className="row d-flex justify-content-center align-items-center">
                    <div id="logo-col" className="col-auto d-flex flex-column align-items-end justify-content-center">
                        <img 
                            id="jammming-logo" 
                            src={IMG.jammmingLogo} 
                            alt="jamming logo"/>
                        <h6>with</h6>
                        <a href="https://open.spotify.com/intl-pt">
                            <img 
                                id="spotify-logo" 
                                src={IMG.spotifyLogo} 
                                alt="spotify logo" 
                                width="100px"/>
                        </a>
                    </div>
                </div>
                <div id="button-row" className="row">
                    <div id="button-col" className="col">
                        
                    </div>
                </div>
                <div id="sub-link-row" className="row">
                    <div id="sub-link-col" className="col">
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginButtonBox;