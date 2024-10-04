import { useState } from "react";
import axios from "axios";

function usePlaylistActions({ accessToken }) {
    
    // Function to edit an existing playlist name
    const editPlaylistName = async (playlistId, newPlaylistName) => {
        if (!accessToken || !playlistId) {
            setError("Missing access token or playlist ID.");
            return;
        }

        try {
            const res = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                name: newPlaylistName,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return res.data;
        } catch (err) {
            console.error("Error updating playlist name:", err);
            setError(err);
        }
    };

    // Function to unfollow a playlist
    const unfollowPlaylist = async (playlistId) => {
        if (!accessToken || !playlistId) {
            setError("Missing access token or playlist ID.");
            return;
        }

        try {
            await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        } catch (err) {
            console.error("Error unfollowing playlist:", err);
            setError(err);
        }
    };

    return { editPlaylistName, unfollowPlaylist };
}

export default usePlaylistActions;