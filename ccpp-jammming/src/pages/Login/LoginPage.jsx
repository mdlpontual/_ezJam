import React from "react";
import LoginButtonBox from "../../components/ui/login/LoginButtonBox";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=9ebed4e372ba404ca817a45f1136c5d8&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20ugc-image-upload%20user-read-email%20user-read-private%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-library-read";

function LoginPage() {
    return (
        <>
            <div id="page-container" className="container-fluid d-flex flex-column">
                <main id="main-row" className="row flex-grow-1">
                    <div id="main-col" className="col d-flex justify-content-center align-items-center">
                        <LoginButtonBox authUrl={AUTH_URL}/>
                    </div>
                </main>
                <footer id="footer-row" className="row">
                    <article id="footer-col" className="col">
                        <h6 id="light-signature">Jammming - a Codecademy portfolio project</h6>
                        <h6 id="bold-signature">copyright mdlpontual - 2024</h6>
                    </article>
                </footer>
            </div>
        </>
    );
}

export default LoginPage;