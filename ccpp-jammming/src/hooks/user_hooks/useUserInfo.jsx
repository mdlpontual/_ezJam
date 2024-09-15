import React, { useState, useEffect } from "react";
import axios from "axios";

function useUserInfo({ accessToken, limit = 50, offset = 0 }) {
    const [userInfo, setUserInfo] = useState({});
    const [userPlaylistsArr, setUserPlaylistsArr] = useState([]);

    //-------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            if (!userPlaylistsArr || !accessToken) return;
    
          try {
            const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: {
                limit: limit,    
                offset: offset
              },
            });
    
            const playlists = res.data.items.filter((playlist) => playlist.owner.display_name === "m").map((playlist) => ({
                playlistId: playlist.id,
                playlistTitle: playlist.name,
                playlistUri: playlist.uri,
                playlistCover: playlist.images[playlist.images.length - 1]?.url,
            }));
    
            setUserPlaylistsArr(playlists);
          } catch (error) {
            console.error("Error fetching album content:", error);
          }
        };
    
        fetchUserPlaylists();
    }, [accessToken]);

    //-------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!userInfo || !accessToken) return;

            try {
            const res = await axios.get(`https://api.spotify.com/v1/me`, {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            });

            const userInfo = res.data;

            setUserInfo(userInfo);
            } catch (error) {
            console.error("Error fetching artist content:", error);
            }
        };

        fetchUserInfo();
    }, [accessToken]);

    //-------------------------------------------------------------------------------------------------------------------------------------------

    return { userInfo, userPlaylistsArr };
};

export default useUserInfo;
