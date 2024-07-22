import React from "react";
import LoginButtonBox from "../../components/ui/login/LoginButtonBox";

function LoginPage() {
    return (
        <>
            <div id="page-container" className="container-fluid d-flex flex-column">
                <div id="main-row" className="row flex-grow-1">
                    <div id="main-col" className="col d-flex justify-content-center align-items-center">
                        <LoginButtonBox/>
                    </div>
                </div>
                <div id="footer-row" className="row">
                    <div id="footer-col" className="col">
                        <h6 id="light-signature">Jammming - a Codecademy portfolio project</h6>
                        <h6 id="bold-signature">copyright mdlpontual - 2024</h6>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;