import React, { useState, useEffect } from "react";
import axios from "axios";

function useFetchContent({ idArtist, idAlbum, accessToken, limit = 50, offset = 0, market = 'US' }) {
  const [fetchedArtistDiscographyArray, setFetchedArtistDiscographyArray] = useState([]);
  const [fetchedArtistTopTracksArray, setFetchedArtistTopTracksArray] = useState([]);
  const [fetchedAlbumTracksArray, setFetchedAlbumTracksArray] = useState([]);

  //----------------------------------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchDiscography = async () => {
      if (!idArtist || idArtist.length === 0) return setFetchedArtistDiscographyArray([]);
      if (!accessToken) return;

      try {
        const res = await axios.get(`https://api.spotify.com/v1/artists/${idArtist}/albums`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: limit,    // Specify the number of albums to fetch
            offset: offset,  // Specify the offset for pagination
            market: market,  // Specify the market for albums
          },
        });

        const discography = res.data.items.map((album) => ({
            albumId: album.id,  
            albumAuthor: album.artists[0].name,
            albumTitle: album.name,
            albumType: album.album_type,
            albumCover: album.images[1]?.url,
            albumYear: album.release_date.slice(0, 4),
            albumTotalTracks: album.total_tracks,
            albumExternalUrls: album.external_urls,
            albumUri: album.uri,
        }));

        setFetchedArtistDiscographyArray(discography);
      } catch (error) {
        console.error("Error fetching album content:", error);
      }
    };

    fetchDiscography();
  }, [idArtist, accessToken, limit, offset]);

  //-------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchTopTracks = async () => {
      if (!idArtist || idArtist.length === 0) return setFetchedArtistTopTracksArray([]);
      if (!accessToken) return;

      try {
        const res = await axios.get(`https://api.spotify.com/v1/artists/${idArtist}/top-tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: limit,    // Specify the number of albums to fetch
            offset: offset,  // Specify the offset for pagination
            market: market,  // Specify the market for albums
          },
        });

        const topTracks = res.data.tracks.map((track) => ({
            trackId: track.id,
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
            trackPeviewUrl: track.preview_url,
            trackExternalIds: track.external_ids,
        }));

        setFetchedArtistTopTracksArray(topTracks);
      } catch (error) {
        console.error("Error fetching album content:", error);
      }
    };

    fetchTopTracks();
  }, [idArtist , accessToken]);

  //-------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      if (!idAlbum || idAlbum.length === 0) return setFetchedAlbumTracksArray([]);
      if (!accessToken) return;

      try {
        const res = await axios.get(`https://api.spotify.com/v1/albums/${idAlbum}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: limit,    // Specify the number of albums to fetch
            offset: offset,  // Specify the offset for pagination
            market: market,  // Specify the market for albums
          },
        });

        const albumTracks = res.data.items.map((track) => ({
            trackId: track.id,
            trackTitle: track.name,
            trackUri: track.uri,
            trackDuration: track.duration_ms,
            trackPopularity: track.popularity,
            trackNumber: track.track_number,
            trackDiscNumber: track.disc_number,
            trackExplicit: track.explicit,
            ptrackPeviewUrl: track.preview_url,
            trackExternalIds: track.external_ids,
        }));

        setFetchedAlbumTracksArray(albumTracks);
      } catch (error) {
        console.error("Error fetching album content:", error);
      }
    };

    fetchAlbumTracks();
  }, [idAlbum , accessToken]);

  /* console.log("DiscographyArray", fetchedArtistDiscographyArray);
  console.log("TopTracksArray", fetchedArtistTopTracksArray);
  console.log("AlbumTracksArray", fetchedAlbumTracksArray); */

  return { fetchedArtistDiscographyArray, fetchedArtistTopTracksArray, fetchedAlbumTracksArray };
}

export default useFetchContent;