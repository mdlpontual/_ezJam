import React from "react";
import LoginContainer from '../components/ui/LoginContainer.jsx';
import IMG from '../assets/images/ImagesHUB.jsx';

function LoginPage() {
    return (
        <>
            <div className="container-fluid">
                <main id="login-main" className="row justify-content-center align-items-center">
                    <div id="login-box" className="container">
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
                </main>
                <footer id="footer-row" className="row">
                    <article id="app-signature">
                        <h6 id="light-signature">Jammming - a Codecademy Practice Project</h6>
                        <h6 id="bold-signature">copyright mdlpontual - 2024</h6>
                    </article>
                </footer>
            </div>
        </>
    );
}

export default LoginPage;