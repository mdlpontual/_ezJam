import React, { useState, useEffect } from "react";
import axios from "axios";

function usePlayerDataFetch({ uriTrack, accessToken }) {
    const [currentPlayingTrack, setCurrentPlayingTrack] = useState({});

    //---------------------------------------------------------------------------------------------------------

    useEffect(() => {
      const fetchCurrentPlayingTrack = async () => {
        if (!uriTrack || uriTrack.length === 0) return setCurrentPlayingTrack({});
        if (!accessToken) return;
  
        try {
          const res = await axios.get(`https://api.spotify.com/v1/me/player`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          });

          setCurrentPlayingTrack(res.data.item);
        } catch (error) {
          console.error("Error fetching playback state:", error);
        }
      };
  
      fetchCurrentPlayingTrack();
    }, [uriTrack, accessToken]);

    //---------------------------------------------------------------------------------------------------------

  return { currentPlayingTrack }
};

export default usePlayerDataFetch;
