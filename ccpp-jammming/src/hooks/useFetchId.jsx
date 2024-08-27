import React, { useState, useEffect } from "react";
import axios from "axios";

function useFetchId({ search, accessToken }) {
  const [searchArtistResults, setSearchArtistResults] = useState([]);
  const [searchAlbumResults, setSearchAlbumResults] = useState([]);
  const [searchTrackResults, setSearchTrackResults] = useState([]);

  useEffect(() => {
    const fetchArtistResults = async () => {
      if (!search) return setSearchArtistResults([]);
      if (!accessToken) return;

      try {
        let cancelToken = axios.CancelToken.source();

        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=artist`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            cancelToken: cancelToken.token,
          }
        );

        const artists = res.data.artists.items.map((artist) => {
          return {
            artistIdResponse: artist.id,
            artistUriResponse: artist.uri
          };
        });

        setSearchArtistResults(artists);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtistResults();
  }, [search, accessToken]);

  useEffect(() => {
    const fetchAlbumResults = async () => {
      if (!search) return setSearchAlbumResults([]);
      if (!accessToken) return;

      try {
        let cancelToken = axios.CancelToken.source();

        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=album`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            cancelToken: cancelToken.token,
          }
        );

        const albums = res.data.albums.items.map((album) => {
          return {
            albumIdResponse: album.id,
            albumUriResponse: album.uri
          };
        });

        setSearchAlbumResults(albums);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbumResults();
  }, [search, accessToken]);

  useEffect(() => {
    const fetchTrackResults = async () => {
      if (!search) return setSearchTrackResults([]);
      if (!accessToken) return;

      try {
        let cancelToken = axios.CancelToken.source();

        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            cancelToken: cancelToken.token,
          }
        );

        const tracks = res.data.tracks.items.map((track) => {
          return {
            trackIdResponse: track.id,
          };
        });

        setSearchTrackResults(tracks);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTrackResults();
  }, [search, accessToken]);

  return { searchArtistResults, searchAlbumResults, searchTrackResults };
}

export default useFetchId;