import React from "react";
import IMG from "../../assets/images/ImagesHUB";

function LoginContainer() {
    return(
        <>
            <div id="login-box" className="container">
                <div id="logo-row" className="row">
                    <div id="jam-logo" className="col">
                        <img src={IMG.jammmingLogo} alt="jammming logo" width='480px' />  
                    </div>
                    <div id="spotify-logo" className="col">
                        <p id="with-text">with</p>
                        <a href="https://open.spotify.com/intl-pt">
                            <img src={IMG.spotifyLogo} alt="spotify logo" width='100px' />
                        </a>  
                    </div>
                </div>
                <div id="button-row" className="row">
                    <div id="button-col" className="col">
                        <button id="login-button" className="btn btn-primary btn-lg" type="button">Login to Spotify</button>
                    </div>
                </div>
                <div id="switch-row" className="row">
                    <div id="switch-col" className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label" for="flexSwitchCheckDefault">&nbsp;&nbsp;Remember-me</label>
                    </div>
                </div>
                <div id="subscribe-row" className="row">
                    <div id="subscribe-col" className="col">
                        <a href="https://www.spotify.com/br-pt/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2Fintl-pt">
                            <p>Subscribe to Spotify</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginContainer;