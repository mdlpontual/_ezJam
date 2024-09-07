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
    const [trackPosition, setTrackPosition] = useState(0);

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
                        setTrackPosition(state.position);
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

    // Function to seek to a specific position
    const seekPosition = (pos) => {
        if (player) {
            player._options.getOAuthToken(access_token => {
                // Make a PUT request to seek to the new position
                fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${pos}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                }).then(() => {
                    console.log(`Successfully moved to ${pos} ms`);
                }).catch((error) => {
                    console.error('Failed to seek:', error);
                });
            });
        };
    };

    return { isPaused, isActive, currentTrack, trackPosition, playTrack, pauseTrack, seekPosition };
}

export default usePlayerControls;