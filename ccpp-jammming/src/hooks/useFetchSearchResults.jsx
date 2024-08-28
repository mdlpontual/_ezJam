import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken }) {
  const [fetchedArtistsArray, setFetchedArtistsArray] = useState([]);
  const [fetchedAlbumsArray, setFetchedAlbumsArray] = useState([]);
  const [fetchedTracksArray, setFetchedTracksArray] = useState([]);

  //----------------------------------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchArtistContent = async () => {
      if (!searchArtistResults || searchArtistResults.length === 0) return setFetchedArtistsArray([]);
      if (!accessToken) return;

      try {
        const joinedArtistsIds = searchArtistResults
          .filter((art, idx) => idx < 10)
          .map((artistIdx) => artistIdx.artistIdResponse)
          .join(',');

        const res = await axios.get(`https://api.spotify.com/v1/artists?ids=${joinedArtistsIds}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const artists = res.data.artists.map((artist) => ({
          artistId: artist.id,
          artistType: artist.type,
          artistName: artist.name,
          artistBanner: artist.images[0]?.url,
          artistProfileImg: artist.images[artist.images.length - 1]?.url,
          artistGenres: artist.genres,
          artistUri: artist.uri,
        }));

        setFetchedArtistsArray(artists);
      } catch (error) {
        console.error("Error fetching artist content:", error);
      }
    };

    fetchArtistContent();
  }, [searchArtistResults, accessToken]);

  //-------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchAlbumContent = async () => {
      if (!searchAlbumResults || searchAlbumResults.length === 0) return setFetchedAlbumsArray([]);
      if (!accessToken) return;

      try {
        const joinedAlbumsIds = searchAlbumResults
          .filter((art, idx) => idx < 10)
          .map((albumIdx) => albumIdx.albumIdResponse)
          .join(',');

        const res = await axios.get(`https://api.spotify.com/v1/albums?ids=${joinedAlbumsIds}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const albums = res.data.albums.map((album) => ({
          albumAuthor: album.artists[0].name,
          albumTitle: album.name,
          albumType: album.album_type,
          albumCover: album.images[0]?.url,
          albumYear: album.release_date.slice(0, 4),
          albumTotalTracks: album.total_tracks,
          albumExternalUrls: album.external_urls,
          albumUri: album.uri,
        }));

        setFetchedAlbumsArray(albums);
      } catch (error) {
        console.error("Error fetching album content:", error);
      }
    };

    fetchAlbumContent();
  }, [searchAlbumResults, accessToken]);

  //-------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchTrackContent = async () => {
      if (!searchTrackResults || searchTrackResults.length === 0) return setFetchedTracksArray([]);
      if (!accessToken) return;

      try {
        const joinedTracksIds = searchTrackResults
          .filter((art, idx) => idx < 10)
          .map((trackIdx) => trackIdx.trackIdResponse)
          .join(',');

        const res = await axios.get(`https://api.spotify.com/v1/tracks?ids=${joinedTracksIds}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const tracks = res.data.tracks.map((track) => ({
          trackTitle: track.name,
          trackAuthor: track.artists[0].name,
          trackAlbum: track.album.name,
          trackCover: track.album.images[track.album.images.length - 1]?.url,
          trackUri: track.uri,
          trackDuration: track.duration_ms,
          trackPopularity: track.popularity,
          trackNumber: track.track_number,
          trackDiscNumber: track.disc_number,
          trackExplicit: track.explicit,
          ptrackPeviewUrl: track.preview_url,
          trackExternalIds: track.external_ids,
        }));

        setFetchedTracksArray(tracks);
      } catch (error) {
        console.error("Error fetching album content:", error);
      }
    };

    fetchTrackContent();
  }, [searchTrackResults, accessToken]);

  //----------------------------------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------------

  const fetchMissingArtistByName = useCallback(async (artistName) => {
    if (!artistName || !accessToken) return null;

    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const artist = res.data.artists.items[0]; // Assuming the first result is the desired artist

      if (artist) {
        const artistData = {
          artistId: artist.id,
          artistType: artist.type,
          artistName: artist.name,
          artistBanner: artist.images[0]?.url,
          artistProfileImg: artist.images[artist.images.length - 1]?.url,
          artistGenres: artist.genres,
          artistUri: artist.uri,
        };

        setFetchedArtistsArray((prevContent) => [...prevContent, artistData]);
        return artistData;
      }

      return null;
    } catch (error) {
      console.error("Error fetching artist content by name:", error);
      return null;
    }
  }, [accessToken]);

  //-------------------------------------------------------------------------------------------------------------------

  const fetchMissingAlbumByName = useCallback(async (albumTitle) => {
    if (!albumTitle || !accessToken) return null;

    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(albumTitle)}&type=album`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const album = res.data.albums.items[0]; // Assuming the first result is the desired artist

      if (album) {
        const albumData = {
          albumId: album.id,
          albumAuthor: album.artists[0].name,
          albumTitle: album.name,
          albumType: album.album_type,
          albumCover: album.images[0]?.url,
          albumYear: album.release_date.slice(0, 4),
          albumTotalTracks: album.total_tracks,
          albumExternalUrls: album.external_urls,
          albumUri: album.uri,
        };

        setFetchedAlbumsArray((prevContent) => [...prevContent, albumData]);
        return albumData;
      }

      return null;
    } catch (error) {
      console.error("Error fetching artist content by name:", error);
      return null;
    }
  }, [accessToken]);

  //----------------------------------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------------

  return { fetchedArtistsArray, fetchedAlbumsArray, fetchedTracksArray, fetchMissingArtistByName, fetchMissingAlbumByName };
}

export default useFetchSearchResults;