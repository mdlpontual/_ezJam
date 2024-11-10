import React from "react";
import IMG from "../../../assets/images/ImagesHUB";


function LoginButtonBox({authUrl}) {
    return (
        <>
            <div id="button-box-container" className="container d-flex flex-column">
                <figure id="logo-row" className="row">
                    <div id="logo-col" className="col-auto d-flex flex-column justify-content-start align-items-end">
                        <div id="jammming-logo" className="col">
                            <img src={IMG.jammmingLogo} alt="jamming logo"/>
                        </div>
                        <div id="spotify-logo" className="col d-flex justify-content-start">
                            <h6 id="with-text">with</h6>
                            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">
                                <img src={IMG.spotifyLogo} alt="spotify logo" height="65px"/>
                            </a>
                        </div>
                    </div>
                </figure>
                <div id="empty-row" className="row flex-grow-1"></div>
                <section id="button-row" className="row">
                    <div id="button-col" className="col d-flex flex-column justify-content-start align-items-center pb-5">
                        <a 
                            id="login-button" 
                            className="row btn btn-primary btn-lg d-flex flex-column justify-content-center align-items-center" 
                            href={authUrl}>
                                Login with your Spotify Account
                        </a>
                        <h5 id="or-text" className="row justify-content-center align-items-center">or</h5>
                        <a 
                            id="subscribe-button" 
                            className="row btn btn-primary btn-lg d-flex flex-column justify-content-center align-items-center" 
                            href="https://www.spotify.com/br-pt/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2Fintl-pt"
                            target="_blank" rel="noopener noreferrer">
                                <img src={IMG.spotifyIcon}/>
                                Get Spotify Free
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
}

export default LoginButtonBox;