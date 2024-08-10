import React from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import AboutPopover from "../../../../utils/AboutPopover";

function HomeHeader() {
    return (
        <>
            <header id="header-inner-container" className="container-fluid d-flex flex-column">
                <section id="header-inner-row" className="row">
                    <figure id="header-logo-col" className="col-auto d-flex justify-content-start align-items-center">
                        <div id="jammming-logo" className="col">
                            <img src={IMG.jammmingLogo} alt="jammming logo" height="80px"/>
                        </div>
                        <div id="spotify-logo" className="col d-flex">
                            <p>with</p>
                            <a href="https://open.spotify.com">
                                <img src={IMG.spotifyLogo} alt="spotify logo" height="35px"/>
                            </a>
                        </div>
                    </figure>
                    <nav id="header-nav-col" className="col d-flex justify-content-end align-items-center">
                        <ul className="d-flex align-items-center">
                            <li><AboutPopover content="copyright mdlpontual - 2024"/></li>
                            <li><a href="">Logoff</a></li>
                        </ul>
                    </nav>
                </section>
            </header>
        </>
    );
}

export default HomeHeader;