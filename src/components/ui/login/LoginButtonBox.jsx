import React from "react";
import IMG from "../../../assets/images/ImagesHUB";

function LoginButtonBox() {
    return (
        <>
            <main id="button-box-container" className="container">
                <figure id="logo-row" className="row">
                    <div id="logo-col" className="col-auto d-flex flex-column justify-content-start align-items-end">
                        <div id="jammming-logo" className="col">
                            <img src={IMG.jammmingLogo} alt="jamming logo"/>
                        </div>
                        <div id="spotify-logo" className="col d-flex justify-content-end">
                            <h6 id="with-text">with</h6>
                            <a href="https://open.spotify.com">
                                <img src={IMG.spotifyLogo} alt="spotify logo" width="100px"/>
                            </a>
                        </div>
                    </div>
                </figure>
                <section id="button-row" className="row">
                    <div id="button-col" className="col d-flex flex-column justify-content-end align-items-center pb-5">
                        <button id="login-button" className="btn btn-primary btn-lg">Login to Spotify</button>
                        <div id="remember-me-switch" className="form-check form-switch pt-3">
                            <input id="switch" type="checkbox" role="switch" className="form-check-input"></input>
                            <label for="switch">Remember-me</label>
                        </div>
                    </div>
                </section>
                <article id="sub-link-row" className="row">
                    <div id="sub-link-col" className="col d-flex justify-content-center align-items-end">
                        <a href="https://www.spotify.com/br-pt/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2Fintl-pt">
                            <p>Subscribe to Spotify</p>
                        </a>
                    </div>
                </article>
            </main>
        </>
    );
}

export default LoginButtonBox;