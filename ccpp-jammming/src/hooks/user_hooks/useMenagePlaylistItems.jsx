import { useState } from "react";
import axios from "axios";

function useMenagePlaylistItems({ playlistData, playlistTracksArr, setPlaylistTracksArr, clearPlaylistCache, accessToken }) {
    const idPlaylist = playlistData.playlistId;
    const [error, setError] = useState(null);

    // Function to delete a track from the playlist
    const deleteTrack = async (uriTrack) => {
        if (!accessToken || !idPlaylist) {
            setError("Missing access token or playlist ID.");
            return;
        }

        try {
            // Make the DELETE request to remove the track from the playlist
            await axios.delete(
                `https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data: {
                    tracks: [{ uri: uriTrack }],  // Correctly format the track URI in the request body
                }
            });

        } catch (err) {
            console.error("Error deleting track:", err);
            setError(err);
        }
    };

    // Function to handle user confirmation and deletion of the track
    const handleDeleteTrack = async (uriTrack) => {
        const confirmed = window.confirm("Are you sure you want to remove this track?");
        if (confirmed) {
            // Wait for the deleteTrack function to complete
            await deleteTrack(uriTrack);
            
            // Update the playlistTracksArr state to remove the track
            const updatedTracks = playlistTracksArr.filter(track => track.trackUri !== uriTrack);
            setPlaylistTracksArr(updatedTracks); // Update state

            // Clear the previous cached data for this playlist
            delete clearPlaylistCache[idPlaylist]; // Remove the old cached data

            // Repopulate the cache with the updated playlist tracks
            clearPlaylistCache[idPlaylist] = updatedTracks;
        }
    };

    return { handleDeleteTrack, error };
}

export default useMenagePlaylistItems;