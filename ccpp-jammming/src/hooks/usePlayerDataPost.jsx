import { useState, useEffect } from "react";
import axios from "axios";

function usePlayerDataPost({ uriTrack, accessToken }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [availableDevices, setAvailableDevices] = useState([]);

    useEffect(() => {
        const fetchAvailableDevices = async () => {
          if (!accessToken) return;
    
          try {
            const res = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              }
            });
    
            const devices = res.data.devices.map((device) => ({
                deviceId: device.id,  
                deviceStatus: device.is_active,
                devicePrivateSession: device.is_private_session,
                deviceRestriction: device.is_restricted,
                deviceName: device.name,
                deviceType: device.type,
                deviceVolumePercent: device.volume_percent,
                deviceSupportsVolume: device.supports_volume
            })); 
    
            setAvailableDevices(devices);
          } catch (error) {
            console.error("Error fetching available devices:", error);
          }
        };
    
        fetchAvailableDevices();
      }, [accessToken]);
    
    const idDevice = availableDevices.length > 0 ? availableDevices[0].deviceId : null;

    const startPlayback = async () => {
        if (!idDevice || !uriTrack || !accessToken) return;
        try {
            await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${idDevice}`,
                { uris: [uriTrack], position_ms: currentPosition },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            setIsPlaying(true);
        } catch (error) {
            console.error("Error starting playback:", error);
        }
    };

    const pausePlayback = async () => {
        if (!idDevice || !accessToken) return;
        try {
            await axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${idDevice}`, 
                {},
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            setIsPlaying(false);
        } catch (error) {
            console.error("Error pausing playback:", error);
        }
    };

    return { startPlayback, pausePlayback, isPlaying, availableDevices };
}

export default usePlayerDataPost;
