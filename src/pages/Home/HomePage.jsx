import React from "react";
import HomeHeader from "./ui/HomeHeader";
import HomeContainers from "./ui/HomeContainers";
import HomeFooter from "./ui/HomeFooter";

function HomePage() {
    return (
        <>
            <div className="container-fluid">
                <header id="header-row" className="row">
                    <HomeHeader/>
                </header>
                <main id="home-main" className="row">
                    <HomeContainers/>
                </main>
                <footer id="footer-row" className="row">
                    <HomeFooter/>
                </footer>
            </div>
        </>
    );
}

export default HomePage;