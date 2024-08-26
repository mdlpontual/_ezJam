import React, { useState, useEffect } from "react";
import axios from "axios";

function useFetchContent({ searchArtistResults, searchAlbumResults, accessToken }) {
  const [artistContent, setArtistContent] = useState([]);
  const [albumContent, setAlbumContent] = useState([]);

  useEffect(() => {
    const fetchArtistContent = async () => {
      if (!searchArtistResults || searchArtistResults.length === 0) return setArtistContent([]);
      if (!accessToken) return;

      try {
        let cancelToken = axios.CancelToken.source();

        const joinedArtistsIds = searchArtistResults.filter((art, idx) => idx < 10).map((artistIdx) => artistIdx.artistIdResponse).join(',');

        const res = await axios.get(`https://api.spotify.com/v1/artists?ids=${joinedArtistsIds}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cancelToken: cancelToken.token,
        });

        const artists = res.data.artists.map((artist) => ({
          artistType: artist.type,
          artistName: artist.name,
          artistBanner: artist.images[0]?.url,
          artistProfileImg: artist.images[artist.images.length - 1]?.url,
          artistGenres: artist.genres,
          artistUri: artist.uri
        }));

        setArtistContent(artists);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching artist content:", error);
      }
    };

    fetchArtistContent();
  }, [searchArtistResults, accessToken]);

  useEffect(() => {
    const fetchAlbumContent = async () => {
      if (!searchAlbumResults || searchAlbumResults.length === 0) return setAlbumContent([]);
      if (!accessToken) return;

      try {
        let cancelToken = axios.CancelToken.source();

        const joinedAlbumsIds = searchAlbumResults.filter((art, idx) => idx < 10).map((albumIdx) => albumIdx.albumIdResponse).join(',');

        const res = await axios.get(`https://api.spotify.com/v1/albums?ids=${joinedAlbumsIds}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cancelToken: cancelToken.token,
        });

        const albums = res.data.albums.map((album) => ({
          albumAutor: album.artists[0].name,
          albumTitle: album.name,
          albumType: album.album_type,
          albumCover: album.images[0]?.url,
          albumYear: album.release_date.slice(0, 4),
          albumUri: album.uri,
          albumTotalTracks: album.total_tracks,
          albumExternalUrls: album.external_urls,
        }));

        setAlbumContent(albums);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching album content:", error);
      }
    };

    fetchAlbumContent();
  }, [searchAlbumResults, accessToken]);

  return { artistContent, albumContent };
}

export default useFetchContent;

















































/* import React, { useState, useEffect } from "react";
import axios from "axios";

function useFetchedContent({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken }) {
  const [artistContent, setArtistContent] = useState([]);
  const [albumContent, setAlbumContent] = useState([]);
  const [songContent, setSongContent] = useState([]);

  const firstArtistId = searchArtistResults.length > 0 ? searchArtistResults[0].id : null;

  useEffect(() => {
    const fetchArtistContent = async () => {
      if (!firstArtistId) return setArtistContent([]);
      if (!accessToken) return;

      try {
        let cancelToken = axios.CancelToken.source();

        const res = await axios.get(`https://api.spotify.com/v1/artists/${firstArtistId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cancelToken: cancelToken.token,
        });

        const artist = {
          id: res.data.id,
          type: res.data.type,
          artist: res.data.name,
          cover: res.data.images[0]?.url,
          profile: res.data.images[res.data.images.length - 1]?.url,
          genres: res.data.genres,
          uri: res.data.uri,
        };

        setArtistContent(artist);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching artist content:", error);
      }
    };

    fetchArtistContent();
  }, [firstArtistId, accessToken]);

  useEffect(() => {
    const fetchAlbumContent = async () => {
      if (!firstArtistId) return setAlbumContent([]);
      if (!accessToken) return;

      try {
        let cancelToken = axios.CancelToken.source();

        const res = await axios.get(`https://api.spotify.com/v1/artists/${firstArtistId}/albums`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cancelToken: cancelToken.token,
        });

        const albums = res.data.items.map((album) => ({
          id: album.id,
          artist: album.artists[0].name,
          album: album.name,
          albumType: album.album_type,
          cover: album.images[0]?.url,
          year: album.release_date.slice(0, 4),
          uri: album.uri,
          totalTracks: album.total_tracks,
          externalUrls: album.external_urls,
        }));

        setAlbumContent(albums);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching album content:", error);
      }
    };

    fetchAlbumContent();
  }, [firstArtistId, accessToken]);

   useEffect(() => {
    const fetchTrackContent = async () => {
      if (!firstSongId) return setSongContent([]);
      if (!accessToken) return;

      try {
        let cancelToken = axios.CancelToken.source();

        const res = await axios.get(
          `https://api.spotify.com/v1/tracks/${firstSongId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            cancelToken: cancelToken.token,
          }
        );

        const track = {
          id: res.data.id,
          title: res.data.name,
          artist: res.data.artists[0].name,
          album: res.data.album.name,
          cover: res.data.album.images[res.data.album.images.length - 1]?.url,
          uri: res.data.uri,
          duration: res.data.duration_ms,
          popularity: res.data.popularity,
          trackNumber: res.data.track_number,
          discNumber: res.data.disc_number,
          explicit: res.data.explicit,
          previewUrl: res.data.preview_url,
          externalIds: res.data.external_ids,
        };

        setSongContent(track);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching track content:", error);
      }
    };

    fetchTrackContent();
  }, [firstSongId, accessToken]); 

  return { artistContent, albumContent, songContent };
}

export default useFetchedContent; */