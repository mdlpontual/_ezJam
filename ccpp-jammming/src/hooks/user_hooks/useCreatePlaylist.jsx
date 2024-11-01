import { useState } from "react";
import axios from "axios";

function useCreatePlaylist({ accessToken, userId, refetchPlaylists }) {
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

    /* const handleCreatePlaylist = async () => {
        const playlistName = prompt("Type your new playlist's name:");
        if (!playlistName || playlistName.trim() === "") {
            alert("Playlist name is required.");
            return;
        }

        // Create the new playlist
        await createPlaylist(playlistName, "", true);

        // Re-fetch playlists to include the newly created one
        await refetchPlaylists();
    }; */

    const handleCreatePlaylist = async () => {
        const playlistName = prompt("Type your new playlist's name:");
        if (!playlistName || playlistName.trim() === "") {
            alert("Playlist name is required.");
            return;
        }
    
        // Create the new playlist
        await createPlaylist(playlistName, "", true);
    
        // Re-fetch playlists with forced override to include the newly created one
        await refetchPlaylists(true);
    };

    return { handleCreatePlaylist };
}

export default useCreatePlaylist;