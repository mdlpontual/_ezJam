import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Default track structure
const defaultTrack = {
    name: "",
    album: { images: [{ url: "" }] },
    artists: [{ name: "" }],
};

function usePlayerControls({ uriTrack, uriQueue, customUriQueue, togglePausePlay, accessToken }) {
    const [isPaused, setIsPaused] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({});
    const [trackPosition, setTrackPosition] = useState(0);
    const [liveTrackPosition, setLiveTrackPosition] = useState(trackPosition);

    const playerInstanceRef = useRef(null);
    const previousUriTrackRef = useRef(uriTrack);
    const previousUriQueueRef = useRef(customUriQueue); 
    const debounceRef = useRef(null); 
    const currentQueueIndex = customUriQueue ? customUriQueue.findIndex(queueTrackUri => queueTrackUri === currentTrack.uri) : 0;

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if (isActive === true) {
            debounceRef.current = setTimeout(() => {
                seekPosition(0); // Call the seekPosition function after a delay
            }, 200); // Debounce delay of 300ms
        }
    }, [isActive]);

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

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        let intervalId;
    
        // Update live position if the track is playing and there's a current track
        if (!isPaused && currentTrack?.uri) {
            togglePausePlay(false);
            intervalId = setInterval(() => {
                setLiveTrackPosition(prevPosition => prevPosition + 200); // Increment by 1 second (1000ms)
            }, 200);
        } else {
            // When paused or when the URI changes, sync live position with track position
            togglePausePlay(true);
            setLiveTrackPosition(trackPosition);
        }
    
        // Clear interval on cleanup or when conditions change
        return () => clearInterval(intervalId);
    }, [isPaused, uriTrack, currentTrack?.uri, trackPosition]);

    useEffect(() => {
        const fetchCurrentTrackPosition = async () => {
            if (!accessToken) return;
    
            try {
                const res = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const progressMs = res.data?.progress_ms || 0;
    
                setTrackPosition(progressMs);
                setLiveTrackPosition(progressMs);
            } catch (error) {
                console.error("Error fetching current track position:", error);
            }
        };
    
        if (isPaused) {
            // Fetch the track position when paused
            fetchCurrentTrackPosition();
        } else if (currentTrack?.uri !== previousUriTrackRef.current) {
            fetchCurrentTrackPosition();
        } else {
             // Fetch once immediately when track resumes or starts playing
             fetchCurrentTrackPosition();
        }
    }, [currentTrack, accessToken, isPaused]);

    // Debounced progress bar change handler
    const handleProgressBarChange = (e) => {
        const newPosition = Number(e.target.value); // Get the new position from the input range
        setTrackPosition(newPosition);
        setLiveTrackPosition(newPosition); // Update local state to reflect this change visually

        // Clear any existing timeout to prevent multiple API calls
        clearTimeout(debounceRef.current);

        // Set a new timeout to debounce the seekPosition API call
        debounceRef.current = setTimeout(() => {
            seekPosition(newPosition); // Call the seekPosition function after a delay
        }, 300); // Debounce delay of 300ms
    }; 

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

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

    useEffect(() => {
        const player = playerInstanceRef.current;
        // Only proceed if `isActive`, `trackPosition` has a valid value, and other conditions are met
        if (isActive && player && customUriQueue && customUriQueue !== previousUriQueueRef.current && trackPosition !== null) {
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify({
                        uris: customUriQueue,
                        offset: { position: currentQueueIndex },
                        position_ms: liveTrackPosition,
                    }), 
                }).then(() => {
                    if (isPaused) {
                        const interval1 = setTimeout(() => pauseTrack(), 50);
                        const interval2 = setTimeout(() => pauseTrack(), 100);
                        const interval3 = setTimeout(() => pauseTrack(), 200);
                        const interval4 = setTimeout(() => pauseTrack(), 300);
                        const interval5 = setTimeout(() => pauseTrack(), 500);
                        const interval6 = setTimeout(() => pauseTrack(), 1000);
                    }
    
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

    return { isPaused, isActive, currentTrack, trackPosition, playTrack, pauseTrack, previousTrack, nextTrack, seekPosition, volumeControl, liveTrackPosition, handleProgressBarChange };
}

export default usePlayerControls;

