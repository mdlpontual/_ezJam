import React from "react";
import HomeHeader from "../components/ui/HomeHeader";
import HomeContainers from "../components/ui/HomeContainers";

function HomePage() {
    return (
        <>
            <div className="container-fluid">
                <header id="header-row" className="row">
                    <HomeHeader />
                </header>
                <main id="home-main" className="row">
                    <HomeContainers />
                </main>
                <footer id="footer-row" className="row">

                </footer>
            </div>
        </>
    );
}

export default HomePage;