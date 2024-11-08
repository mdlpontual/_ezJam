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
                            <li>
                                <div>
                                    <AboutPopover content={`
                                    <p>In this application, you will find a better and improved way to customize your beloved Spotify's playlists!</p>
                                    <br>
                                    <p>Only with ezJam will you have the ability to simultaneously view the content of your playlists while exploring Spotify's music catalog, all at the same time, side by side!</p>
                                    <br>
                                    <p>Focusing solely on songs, albums, and artists, you will have a more streamlined experience to create, edit, and customize your music playlists. Less distractions means better flow and more exploration!</p>
                                    <br>
                                    <h5>- Select one or multiple tracks at the same time;</h5>
                                    <h5>- Drag and drop to add new songs or to change their order;</h5>
                                    <h5>- Maintain control of your customization by saving or discarding the changes you make along the way.</h5>
                                    <br>
                                    <p>After your customizations, you can play the playlists in your Spotify app or even share them with a simple quick click!</p>
                                    <br>
                                    <p>Enjoy your jams!</p>
                                    <hr></hr>
                                    <h6>copyright mdlpontual - 2024</h6>`}/>
                                </div>
                            </li>
                            <li><a href="">Logoff</a></li>
                        </ul>
                    </nav>
                </section>
            </header>
        </>
    );
}

export default HomeHeader;