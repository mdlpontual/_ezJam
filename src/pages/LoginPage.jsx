import React from "react";
import LoginContainer from '../components/ui/LoginContainer.jsx';
import LoginSignature from "../components/ui/LoginSignature.jsx";

function LoginPage() {
    return (
        <>
            <div className="container-fluid">
                <main id="login-main" className="row justify-content-center align-items-center">
                    <LoginContainer/>
                </main>
                <footer id="footer-row" className="row">
                    <LoginSignature/>
                </footer>
            </div>
        </>
    );
}

export default LoginPage;