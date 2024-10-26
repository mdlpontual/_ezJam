import React, { useState, useEffect, useRef } from "react";

// Default track structure
const defaultTrack = {
    name: "",
    album: { images: [{ url: "" }] },
    artists: [{ name: "" }],
};

function usePlayerControls({ uriTrack, uriQueue }) {
    const [isPaused, setIsPaused] = useState(true); // Initial state for pause/play
    const [isActive, setIsActive] = useState(false); // If the player is active
    const [currentTrack, setCurrentTrack] = useState(defaultTrack); // Current track details
    const [trackPosition, setTrackPosition] = useState(0);
    const playerInstanceRef = useRef(null); // Ref to track the player instance

    // Initialize Spotify SDK
    useEffect(() => {
        const loadSpotifyPlayer = () => {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (!window.onSpotifyWebPlaybackSDKReady) {
                    window.onSpotifyWebPlaybackSDKReady = () => {
                        if (playerInstanceRef.current) return; // Prevent re-initialization

                        const player = new window.Spotify.Player({
                            name: 'ezJam Track Player',
                            getOAuthToken: cb => { cb(window.spotifyAccessToken); }, // Use access token from global scope
                            volume: 0.5,
                        });

                        playerInstanceRef.current = player; // Store the player instance

                        player.addListener('ready', ({ device_id }) => {
                            console.log("Ready with Device ID", device_id);
                        });

                        player.addListener('not_ready', ({ device_id }) => {
                            console.log("Device ID has gone offline", device_id);
                        });

                        // Use player_state_changed to capture track changes and update state immediately
                        player.addListener('player_state_changed', state => {
                            if (!state) return;

                            // Update the current track details, paused state, and position
                            setCurrentTrack(state.track_window.current_track);
                            setIsPaused(state.paused);
                            setTrackPosition(state.position);
                            setIsActive(true);
                        });

                        player.connect();
                    };
                }
            };
        };

        // Only load the SDK if the Spotify object doesn't exist or the player hasn't been initialized
        if (!window.Spotify && !playerInstanceRef.current) {
            loadSpotifyPlayer();
        } else if (window.Spotify.Player && !playerInstanceRef.current) {
            window.onSpotifyWebPlaybackSDKReady();
        }

        // Cleanup function to disconnect the player when the component unmounts
        return () => {
            if (playerInstanceRef.current) {
                playerInstanceRef.current.disconnect();
                playerInstanceRef.current = null; // Clear the ref to avoid memory leaks
            }
        };
    }, []);

    //------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Play a new track when uriTrack changes and set the whole queue
    useEffect(() => {
        const player = playerInstanceRef.current;
        if (player && uriTrack && uriQueue) {
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        uris: uriQueue,  // Set the entire queue
                        offset: { uri: uriTrack }, // Start from the current track
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                });
            });
        }
    }, [uriTrack, uriQueue]);

    // Function to play track
    const playTrack = () => {
        const player = playerInstanceRef.current;
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
        const player = playerInstanceRef.current;
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Use debouncing technique to prevent multiple re-renders
    const debounceFetchState = (func, delay) => {
        let debounceTimeout;
        return (...args) => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func(...args), delay);
        };
    };

    // Skip to previous track
    const previousTrack = () => {
        const player = playerInstanceRef.current;
        if (player) {
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/previous`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                }).catch((error) => {
                    console.error('Failed to move to previous track:', error);
                });
            });
        }
    };

    // Skip to next track
    const nextTrack = () => {
        const player = playerInstanceRef.current;
        if (player) {
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/next`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                }).catch((error) => {
                    console.error('Failed to move to next track:', error);
                });
            });
        }
    };

    //------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Function to seek to a specific position
    const seekPosition = debounceFetchState((pos) => {
        const player = playerInstanceRef.current;
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
        }
    }, 300); // Debounce delay of 300ms

    // Function to control volume
    const volumeControl = (vol) => {
        const player = playerInstanceRef.current;
        if (player) {
            player._options.getOAuthToken(access_token => {
                // Make a PUT request to seek the volume value
                fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${vol * 100}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                }).then(() => {
                    console.log(`Successfully changed volume to ${vol}`);
                }).catch((error) => {
                    console.error('Failed to change volume:', error);
                });
            });
        }
    };

    return { isPaused, isActive, currentTrack, trackPosition, playTrack, pauseTrack, previousTrack, nextTrack, seekPosition, volumeControl };
}

export default usePlayerControls;