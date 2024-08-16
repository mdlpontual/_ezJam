import React, { useState, useEffect } from "react";

function useAdimPlaylistPage() {
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

    useEffect(() => {
        const handlePlaylistClick = () => {
            setIsPlaylistOpen(true);
        };

        const handleBackClick = () => {
            setIsPlaylistOpen(false);
        };

        const playlistElement = document.getElementById("pl-name");
        const backElement = document.getElementById("back-to-playlists");

        if (playlistElement) {
            playlistElement.addEventListener("click", handlePlaylistClick);
        }

        if (backElement) {
            backElement.addEventListener("click", handleBackClick);
        }

        return () => {
            if (playlistElement) {
                playlistElement.removeEventListener("click", handlePlaylistClick);
            }
            if (backElement) {
                backElement.removeEventListener("click", handleBackClick);
            }
        };
    }, [isPlaylistOpen]);

  return isPlaylistOpen;
};

export default useAdimPlaylistPage;
