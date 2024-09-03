import { useState, useEffect } from "react";
import axios from "axios";

function usePlayerDataPost({ availableDevices, accessToken, uriTrack }) {
    const [isPlaying, setIsPlaying] = useState(false);
    
    const idDevice = availableDevices.length > 0 ? availableDevices[0].deviceId : null;

    const startPlayback = async () => {
        if (!idDevice || !uriTrack || !accessToken) return;

        try {
            await axios.put(
                `https://api.spotify.com/v1/me/player/play?device_id=${idDevice}`,
                {
                    uris: [uriTrack],
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setIsPlaying(true);
        } catch (error) {
            console.error("Error starting playback:", error);
        }
    };

    const pausePlayback = async () => {
        if (!idDevice || !accessToken) return;

        try {
            await axios.put(
                `https://api.spotify.com/v1/me/player/pause?device_id=${idDevice}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setIsPlaying(false);
        } catch (error) {
            console.error("Error pausing playback:", error);
        }
    };

    return { startPlayback, pausePlayback, isPlaying };
}

export default usePlayerDataPost;
