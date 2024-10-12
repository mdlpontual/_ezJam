/* import { useState } from "react";
import axios from "axios";

function usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken }) {
    const [newEditedName, setNewEditedName] = useState(playlistData.playlistTitle);

    // Function to edit an existing playlist name
    const editPlaylistName = async (playlistId, newPlaylistName) => {
        if (!accessToken || !playlistId) {
            console.error("Missing access token or playlist ID.");
            return;
        }

        try {
            const res = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                name: newPlaylistName,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return res.data;
        } catch (err) {
            console.error("Error updating playlist name:", err);
        }
    };

    // Function to reorder tracks in a playlist
    const reorderTracksInPlaylist = async (playlistId, uris) => {
        if (!accessToken || !playlistId) {
            console.error("Missing access token or playlist ID.");
            return;
        }

        try {
            await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                uris,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (err) {
            console.error("Error reordering tracks:", err);
        }
    };

    // Function to unfollow a playlist
    const unfollowPlaylist = async (playlistId) => {
        if (!accessToken || !playlistId) {
            console.error("Missing access token or playlist ID.");
            return;
        }

        try {
            await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (err) {
            console.error("Error unfollowing playlist:", err);
        }
    };

    // Edit playlist name locally and in the API
    const handleEditPlaylist = async () => {
        const newPlaylistName = prompt("Enter the new playlist name:", playlistData.playlistTitle);
        if (newPlaylistName && newPlaylistName.trim() !== "") {
            try {
                await editPlaylistName(playlistData.playlistId, newPlaylistName);

                // Immediately update the playlist name locally
                setUserPlaylistsArr((prevPlaylists) =>
                    prevPlaylists.map((playlist) =>
                        playlist.playlistId === playlistData.playlistId
                            ? { ...playlist, playlistTitle: newPlaylistName }
                            : playlist
                    )
                );

                await editPlaylists(newPlaylistName, playlistData.playlistId);

                setNewEditedName(newPlaylistName);
            } catch (error) {
                console.error("Error updating playlist or re-fetching:", error);
            }
        }
    };

    // Share playlist
    const handleSharePlaylist = () => {
        const playlistUrl = `https://open.spotify.com/playlist/${playlistData.playlistId}`;
        navigator.clipboard.writeText(playlistUrl)
            .then(() => {
                alert("Playlist URL copied to clipboard!");
            })
            .catch((error) => {
                console.error("Error copying playlist URL:", error);
            });
    };

    // Unfollow playlist
    const handleUnfollowPlaylist = async () => {
        const confirmUnfollow = window.confirm("Are you sure you want to unfollow this playlist?");
        if (confirmUnfollow) {
            try {
                await unfollowPlaylist(playlistData.playlistId);

                // Remove the unfollowed playlist locally
                setUserPlaylistsArr((prevPlaylists) =>
                    prevPlaylists.filter((playlist) => playlist.playlistId !== playlistData.playlistId)
                );

                await refetchPlaylists();

            } catch (error) {
                console.error("Error unfollowing playlist:", error);
            }
        }
    };

    console.log(newEditedName)

    return {
        handleEditPlaylist,
        handleSharePlaylist,
        handleUnfollowPlaylist,
        reorderTracksInPlaylist, // This is the new function to reorder tracks
        newEditedName,
    };
}

export default usePlaylistActions; */


import { useState } from "react";
import axios from "axios";

function usePlaylistActions({ playlistData, editPlaylists, refetchPlaylists, setUserPlaylistsArr, accessToken }) {
    const [newEditedName, setNewEditedName] = useState(playlistData.playlistTitle);

    // Function to edit an existing playlist name
    const editPlaylistName = async (playlistId, newPlaylistName) => {
        if (!accessToken || !playlistId) {
            console.error("Missing access token or playlist ID.");
            return;
        }

        try {
            const res = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                name: newPlaylistName,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return res.data;
        } catch (err) {
            console.error("Error updating playlist name:", err);
        }
    };

    // Function to reorder tracks in a playlist
    const reorderTracksInPlaylist = async (playlistId, uris) => {
        if (!accessToken || !playlistId) {
            console.error("Missing access token or playlist ID.");
            return;
        }

        try {
            await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                uris,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (err) {
            console.error("Error reordering tracks:", err);
        }
    };

    // Function to unfollow a playlist
    const unfollowPlaylist = async (playlistId) => {
        if (!accessToken || !playlistId) {
            console.error("Missing access token or playlist ID.");
            return;
        }

        try {
            await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (err) {
            console.error("Error unfollowing playlist:", err);
        }
    };

    // Edit playlist name locally and in the API
    const handleEditPlaylist = async () => {
        const newPlaylistName = prompt("Enter the new playlist name:", playlistData.playlistTitle);
        if (newPlaylistName && newPlaylistName.trim() !== "") {
            try {
                await editPlaylistName(playlistData.playlistId, newPlaylistName);

                // Immediately update the playlist name locally
                setUserPlaylistsArr((prevPlaylists) =>
                    prevPlaylists.map((playlist) =>
                        playlist.playlistId === playlistData.playlistId
                            ? { ...playlist, playlistTitle: newPlaylistName }
                            : playlist
                    )
                );

                await editPlaylists(newPlaylistName, playlistData.playlistId);

                setNewEditedName(newPlaylistName);
            } catch (error) {
                console.error("Error updating playlist or re-fetching:", error);
            }
        }
    };

    // Share playlist
    const handleSharePlaylist = () => {
        const playlistUrl = `https://open.spotify.com/playlist/${playlistData.playlistId}`;
        navigator.clipboard.writeText(playlistUrl)
            .then(() => {
                alert("Playlist URL copied to clipboard!");
            })
            .catch((error) => {
                console.error("Error copying playlist URL:", error);
            });
    };

    // Unfollow playlist
    const handleUnfollowPlaylist = async () => {
        const confirmUnfollow = window.confirm("Are you sure you want to unfollow this playlist?");
        if (confirmUnfollow) {
            try {
                await unfollowPlaylist(playlistData.playlistId);

                // Remove the unfollowed playlist locally
                setUserPlaylistsArr((prevPlaylists) =>
                    prevPlaylists.filter((playlist) => playlist.playlistId !== playlistData.playlistId)
                );

                await refetchPlaylists();

            } catch (error) {
                console.error("Error unfollowing playlist:", error);
            }
        }
    };

    return {
        handleEditPlaylist,
        handleSharePlaylist,
        handleUnfollowPlaylist,
        reorderTracksInPlaylist, // This is the new function to reorder tracks
        newEditedName,
    };
}

export default usePlaylistActions;