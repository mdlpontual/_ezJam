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



















































/* import React, { useState, useEffect } from "react";
import axios from "axios";

function useSearchResults({ search, accessToken }) {
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
          const smallestProfilePicture = artist.images.length - 1;
          return {
            id: artist.id,
            type: artist.type,
            artist: artist.name,
            cover: artist.images[0]?.url,
            profile: artist.images[smallestProfilePicture]?.url,
            genres: artist.genres,
            uri: artist.uri,
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
          const smallestAlbumCover = album.images.length - 1;
          return {
            id: album.id,
            artist: album.artists[0].name,
            album: album.name,
            albumType: album.album_type,
            cover: album.images[smallestAlbumCover]?.url,
            year: album.release_date.slice(0, 4),
            uri: album.uri,
            totalTracks: album.total_tracks,
            externalUrls: album.external_urls,
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
          const smallestAlbumCover = track.album.images.length - 1;
          return {
            id: track.id,
            title: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            cover: track.album.images[smallestAlbumCover]?.url,
            uri: track.uri,
            duration: track.duration_ms,
            popularity: track.popularity,
            trackNumber: track.track_number,
            discNumber: track.disc_number,
            explicit: track.explicit,
            previewUrl: track.preview_url,
            externalIds: track.external_ids,
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

export default useSearchResults;
 */