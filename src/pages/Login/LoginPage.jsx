import React from "react";
import LoginButtonBox from "../../components/ui/login/LoginButtonBox";

function LoginPage() {
    return (
        <>
            <div id="page-container" className="container-fluid d-flex flex-column">
                <main id="main-row" className="row flex-grow-1">
                    <div id="main-col" className="col d-flex justify-content-center align-items-center">
                        <LoginButtonBox />
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