import React, { useState, useEffect, useRef } from "react";

// Default track structure
const defaultTrack = {
    name: "",
    album: { images: [{ url: "" }] },
    artists: [{ name: "" }],
};

function usePlayerControls({ uriTrack, uriQueue, customUriQueue }) {
    const [isPaused, setIsPaused] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(defaultTrack);
    const [trackPosition, setTrackPosition] = useState(0);
    const playerInstanceRef = useRef(null);
    const previousUriTrackRef = useRef(uriTrack);
    const previousUriQueueRef = useRef(customUriQueue); 

    useEffect(() => {
        const loadSpotifyPlayer = () => {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (!window.onSpotifyWebPlaybackSDKReady) {
                    window.onSpotifyWebPlaybackSDKReady = () => {
                        if (playerInstanceRef.current) return;

                        const player = new window.Spotify.Player({
                            name: 'ezJam Track Player',
                            getOAuthToken: cb => { cb(window.spotifyAccessToken); },
                            volume: 0.5,
                        });

                        playerInstanceRef.current = player;

                        player.addListener('ready', ({ device_id }) => {
                            console.log("Ready with Device ID", device_id);
                        });

                        player.addListener('not_ready', ({ device_id }) => {
                            console.log("Device ID has gone offline", device_id);
                        });

                        player.addListener('player_state_changed', state => {
                            if (!state) return;
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

        if (!window.Spotify && !playerInstanceRef.current) {
            loadSpotifyPlayer();
        } else if (window.Spotify.Player && !playerInstanceRef.current) {
            window.onSpotifyWebPlaybackSDKReady();
        }

        return () => {
            if (playerInstanceRef.current) {
                playerInstanceRef.current.disconnect();
                playerInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const player = playerInstanceRef.current;
        if (player && uriTrack && uriQueue && uriTrack !== previousUriTrackRef.current) {
            previousUriTrackRef.current = uriTrack;
    
            // Set a debounce to avoid rapid playback requests
            const debounceTimeout = setTimeout(() => {
                player._options.getOAuthToken(access_token => {
                    fetch(`https://api.spotify.com/v1/me/player/play`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            uris: uriQueue,
                            offset: { uri: uriTrack },
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${access_token}`,
                        },
                    });
                });
            }, 100); // Adjust debounce delay as needed
    
            // Cleanup function to clear timeout if uriTrack changes quickly
            return () => clearTimeout(debounceTimeout);
        }
    }, [uriTrack, uriQueue]);

    // New effect to update the uriQueue without triggering playback
    useEffect(() => {
        const player = playerInstanceRef.current;
        if (isActive && player && customUriQueue && customUriQueue !== previousUriQueueRef.current) {
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: uriQueue }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                }).then(() => {
                    // Start a series of intervals to pause playback
                    const interval1 = setTimeout(() => pauseTrack(), 50);
                    const interval2 = setTimeout(() => pauseTrack(), 100);
                    const interval3 = setTimeout(() => pauseTrack(), 200);
                    const interval4 = setTimeout(() => pauseTrack(), 300);
                    const interval5 = setTimeout(() => pauseTrack(), 500);
                    const interval6 = setTimeout(() => pauseTrack(), 1000);
    
                    // Cleanup intervals once the effect runs or component unmounts
                    return () => {
                        clearTimeout(interval1);
                        clearTimeout(interval2);
                        clearTimeout(interval3);
                        clearTimeout(interval4);
                        clearTimeout(interval5);
                        clearTimeout(interval6);
                    };
                });
            });
        }
    }, [customUriQueue]);

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

    const debounceFetchState = (func, delay) => {
        let debounceTimeout;
        return (...args) => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func(...args), delay);
        };
    };

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

    const seekPosition = debounceFetchState((pos) => {
        const player = playerInstanceRef.current;
        if (player) {
            player._options.getOAuthToken(access_token => {
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
    }, 300);

    const volumeControl = (vol) => {
        const player = playerInstanceRef.current;
        if (player) {
            player._options.getOAuthToken(access_token => {
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