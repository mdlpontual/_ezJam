import React, { useState, useEffect } from "react";
import IMG from "../../../../assets/images/ImagesHUB";
import AboutPopover from "../../../../utils/AboutPopover";

function HomeHeader({ logout }) {

    return (
        <>
            <header id="header-inner-container" className="container-fluid d-flex flex-column">
                <section id="header-inner-row" className="row">
                    <figure id="header-logo-col" className="col-auto d-flex justify-content-start align-items-center">
                        <div id="jammming-logo" className="col">
                            <img src={IMG.jammmingLogo} alt="jammming logo" height="80px"/>
                        </div>
                    </figure>
                    <nav id="header-nav-col" className="col d-flex justify-content-end align-items-center">
                        <ul className="d-flex justify-content-center align-items-center">
                            <li className="d-flex justify-content-center align-items-center">
                                <a type="button" 
                                    id="spotify-button" 
                                    className="btn btn-primary btn-lg d-flex justify-content-center align-items-center"
                                    href="https://open.spotify.com"
                                    target="_blank" rel="noopener noreferrer">
                                        <img src={IMG.spotifyIcon}/>
                                        <h6>Play on Spotify</h6>
                                </a>
                            </li>
                            <li>
                                <div>
                                    <AboutPopover content={`
                                    <p>In this application, you will find an improved and more focused way to customize your beloved Spotify playlists!</p>
                                    <br>
                                    <p>Only with ezJam will you have the ability to simultaneously view the content of your playlists while exploring Spotify's music catalog, all at the same time, side by side!</p>
                                    <br>
                                    <p>Focusing solely on songs, albums, and artists, you will have a more streamlined experience to create, edit, and customize your music playlists. Less distractions means better flow and more exploration!</p>
                                    <br>
                                    <h5>- Select one or multiple tracks at the same time;</h5>
                                    <h5>- Drag and drop to add new songs or to change their order;</h5>
                                    <h5>- Maintain control of your customization by saving or discarding the changes you make along the way.</h5>
                                    <br>
                                    <p>Enable the <strong>"ezJam Track Player"</strong> in the "Connect to a Device" section of your Spotify app to listen to your songs right here.</p>
                                    <p>After the work is done, you can play the playlists in any Spotify app or share them with a simple quick click!</p>
                                    <br>
                                    <p>Enjoy your jams!</p>
                                    <hr></hr>
                                    <h6>copyright mdlpontual - 2024</h6>`}/>
                                </div>
                            </li>
                            <li id="logoff" type="button" onClick={logout} style={{ cursor: 'pointer' }}>Logoff</li>
                        </ul>
                    </nav>
                </section>
            </header>
        </>
    );
}

export default HomeHeader;