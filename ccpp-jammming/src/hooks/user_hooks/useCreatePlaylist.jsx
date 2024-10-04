import { useState } from "react";
import axios from "axios";

function useCreatePlaylist({ accessToken, userId }) {
    const [newPlaylist, setNewPlaylist] = useState(null);
    const [error, setError] = useState(null);

    // Function to create a new playlist
    const createPlaylist = async (playlistName, description = "", isPublic = true) => {
        if (!accessToken || !userId) {
            setError("Missing access token or user ID.");
            return;
        }

        try {
            const res = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                name: playlistName,
                description: description,
                public: isPublic
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setNewPlaylist(res.data); // Store the created playlist data
            return res.data;
        } catch (err) {
            console.error("Error creating playlist:", err);
            setError(err);
        }
    };

    return { createPlaylist, newPlaylist, error };
}

export default useCreatePlaylist;