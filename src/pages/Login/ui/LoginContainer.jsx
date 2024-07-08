import React from "react";
import IMG from "../../../assets/images/ImagesHUB";

function LoginContainer() {
    return (
        <>
            <div id="login-box" className="container">
                <figure id="logo-row" className="row">
                    <div id="jam-logo" className="col">
                        <img src={IMG.jammmingLogo} alt="jammming logo" width='480px' />  
                    </div>
                    <div id="spotify-logo" className="col">
                        <p id="with-text">with</p>
                        <a href="https://open.spotify.com/intl-pt">
                            <img src={IMG.spotifyLogo} alt="spotify logo" width='100px' />
                        </a>  
                    </div>
                </figure>
                <div id="button-row" className="row">
                    <div id="button-col" className="col">
                        <button id="login-button" className="btn btn-primary btn-lg" type="button">Login to Spotify</button>
                    </div>
                </div>
                <div id="switch-row" className="row">
                    <div id="switch-col" className="form-check form-switch">
                        <input id="switch" type="checkbox" role="switch" className="form-check-input"></input>
                        <label for="switch">&nbsp;&nbsp;Remember-me</label>
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