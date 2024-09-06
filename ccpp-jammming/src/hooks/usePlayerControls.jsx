import { useState, useEffect } from "react";

// Default track structure
const defaultTrack = {
    name: "",
    album: { images: [{ url: "" }] },
    artists: [{ name: "" }],
};

function usePlayerControls(uriTrack) {
    const [isPaused, setIsPaused] = useState(true); // Initial state for pause/play
    const [isActive, setIsActive] = useState(false); // If the player is active
    const [player, setPlayer] = useState(null); // Spotify player instance
    const [currentTrack, setCurrentTrack] = useState(defaultTrack); // Current track details

    // Initialize Spotify SDK
    useEffect(() => {
        const loadSpotifyPlayer = () => {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                window.onSpotifyWebPlaybackSDKReady = () => {
                    const player = new window.Spotify.Player({
                        name: 'Jammming Track Player',
                        getOAuthToken: cb => { cb(window.spotifyAccessToken); }, // Use access token from global scope
                        volume: 0.5,
                    });

                    setPlayer(player);

                    player.addListener('ready', ({ device_id }) => {
                        console.log("Ready with Device ID", device_id);
                    });

                    player.addListener('not_ready', ({ device_id }) => {
                        console.log("Device ID has gone offline", device_id);
                    });

                    player.addListener('player_state_changed', state => {
                        if (!state) return;
                        setCurrentTrack(state.track_window.current_track); // Update current track
                        setIsPaused(state.paused); // Update paused state
                        player.getCurrentState().then(state => {
                            setIsActive(!!state); // Update active state
                        });
                    });

                    player.connect();
                };
            };
        };

        if (!window.Spotify) {
            loadSpotifyPlayer();
        } else if (window.Spotify.Player) {
            window.onSpotifyWebPlaybackSDKReady();
        }
    }, []);

    // Play a new track when uriTrack changes
    useEffect(() => {
        if (player && uriTrack) {
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: [uriTrack] }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                });
            });
        }
    }, [uriTrack, player]);

    // Function to play track
    const playTrack = () => {
        if (player) {
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                }).then(() => {
                    setIsPaused(false);
                });
            });
        }
    };

    // Function to pause track
    const pauseTrack = () => {
        if (player) {
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/pause`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                }).then(() => {
                    setIsPaused(true);
                });
            });
        }
    };

    return { isPaused, isActive, currentTrack, playTrack, pauseTrack };
}

export default usePlayerControls;


/* import React, { useState, useEffect } from "react";

const track = {
    name: "",
    album: {
        images: [{ url: "" }],
    },
    artists: [{ name: "" }],
};

function usePlayerControls(uriTrack) {
    const [isPaused, setIsPaused] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [currentTrack, setCurrentTrack] = useState(track);

    useEffect(() => {
        const loadSpotifyPlayer = () => {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                window.onSpotifyWebPlaybackSDKReady = () => {
                    const player = new window.Spotify.Player({
                        name: 'Jammming Track Player',
                        getOAuthToken: (cb) => { cb(window.spotifyAccessToken); },
                        volume: 0.5,
                    });

                    setPlayer(player);

                    player.addListener("ready", ({ device_id }) => {
                        console.log("Ready with Device ID", device_id);
                    });

                    player.addListener("not_ready", ({ device_id }) => {
                        console.log("Device ID has gone offline", device_id);
                    });

                    player.addListener("player_state_changed", (state) => {
                        if (!state) return;

                        setCurrentTrack(state.track_window.currentTrack);
                        setIsPaused(state.paused);

                        player.getCurrentState().then((state) => {
                            setIsActive(!!state);
                        });
                    });

                    player.connect();
                };
            };
        };

        if (!window.Spotify) {
            loadSpotifyPlayer();
        } else if (window.Spotify.Player) {
            // If Spotify already exists in the window object, initialize the player directly
            window.onSpotifyWebPlaybackSDKReady();
        }

    }, []);

    // Play the new track when uriTrack changes
    useEffect(() => {
        if (player && uriTrack) {
            player._options.getOAuthToken((access_token) => {
                fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: [uriTrack] }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                });
            });
        }
    }, [uriTrack, player]);

    return { isPaused, isActive, player, currentTrack };
}

export default usePlayerControls; */


/* import React, { useState, useEffect } from "react";

const track = {
    name: "",
    album: {
        images: [{ url: "" }],
    },
    artists: [{ name: "" }],
};

function usePlayerControls() {
    const [isPaused, setIsPaused] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [currentTrack, setCurrentTrack] = useState(track);

    useEffect(() => {
        const initializePlayer = async () => {
            while (!window.spotifyAccessToken) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                window.onSpotifyWebPlaybackSDKReady = () => {
                    const player = new window.Spotify.Player({
                        name: 'Jammming Track Player',
                        getOAuthToken: (cb) => { cb(window.spotifyAccessToken); },
                        volume: 0.5,
                    });

                    setPlayer(player);

                    player.addListener("ready", ({ device_id }) => {
                        console.log("Ready with Device ID", device_id);
                    });

                    player.addListener("not_ready", ({ device_id }) => {
                        console.log("Device ID has gone offline", device_id);
                    });

                    player.addListener("player_state_changed", (state) => {
                        if (!state) return;

                        setCurrentTrack(state.track_window.currentTrack);
                        setIsPaused(state.paused);

                        player.getCurrentState().then((state) => {
                            setIsActive(!!state);
                        });
                    });

                    player.connect();
                };
            };
        };

        initializePlayer();
    }, []);

    return { isPaused, isActive, player, currentTrack };
}

export default usePlayerControls; */


/* import React, { useState, useEffect } from "react";

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function usePlayerControls() {
    const [isPaused, setIsPaused] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [currentTrack, set] = useState(track);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        //-------------------------------------------------------------------------------------------------------------------------------------------------------

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Jammming Track Player',
                getOAuthToken: cb => { cb(window.spotifyAccessToken); },
                volume: 0.5
            });

            setPlayer(player);

            //--------------------------------------------------------------------------------------------------------------

            player.addListener('ready', ({ deviceId }) => {
                console.log('Ready with Device ID', deviceId);
            });

            //--------------------------------------------------------------------------------------------------------------

            player.addListener('not_ready', ({ deviceId }) => {
                console.log('Device ID has gone offline', deviceId);
            });

            //--------------------------------------------------------------------------------------------------------------

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                set(state.track_window.currentTrack);
                setIsPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setIsActive(false) : setIsActive(true) 
                });

            }));

            //--------------------------------------------------------------------------------------------------------------

            player.connect();

        };
    }, []);

    return { isPaused, isActive, player, currentTrack };
}

export default usePlayerControls;
 */