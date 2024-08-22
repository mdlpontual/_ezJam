import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "9ebed4e372ba404ca817a45f1136c5d8",
});

function useFetchedContent({ firstArtistId, firstAlbumId, firstSongId, accessToken }) {
  const [artistContent, setArtistContent] = useState([]);
  const [albumContent, setAlbumContent] = useState([]);
  const [songContent, setSongContent] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const fetchArtistResults = async () => {
      if (!firstArtistId) return setArtistContent([]);
      if (!accessToken) return;
  
      try {
        let cancel = false;
  
        const res = await spotifyApi.getArtist(firstArtistId);
        if (cancel) return;

        const artists = () => {
          const smallestProfilePicture = res.body.images.length - 1;
          return {
            id: res.body.id,
            type: res.body.type,
            artist: res.body.name,
            cover: res.body.images[0]?.url,
            profile: res.body.images[smallestProfilePicture]?.url,
            genres: res.body.genres,
            uri: res.body.uri
          }
        };
  
        setArtistContent(artists);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
  
      return () => cancel = true;
    };
  
    fetchArtistResults();
  }, [firstArtistId, accessToken]);

  useEffect(() => {
    const fetchArtistResults = async () => {
      if (!firstArtistId) return setAlbumContent([]);
      if (!accessToken) return;
  
      try {
        let cancel = false;
  
        const res = await spotifyApi.getArtistAlbums(firstArtistId);
        if (cancel) return;

        const albums = res.body.items.map(albums => {
          return {
            id: albums.id,
            artist: albums.artists[0].name,
            album: albums.name,
            albumType: albums.album_type,
            cover: albums.images[0]?.url,
            year: albums.release_date.slice(0, 4),
            uri: albums.uri,
            totalTracks: albums.total_tracks,
            externalUrls: albums.external_urls
          }
        });
  
        setAlbumContent(albums);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
  
      return () => cancel = true;
    };
  
    fetchArtistResults();
  }, [firstArtistId, accessToken]);

  /* useEffect(() => {
    const fetchArtistResults = async () => {
      if (!firstSongId) return setSongContent([]);
      if (!accessToken) return;
  
      try {
        let cancel = false;
  
        const res = await spotifyApi.getTracks(firstSongId);
        if (cancel) return;

        const songs = () => {
          const smallestAlbumCover = res.body.images.length - 1;
          return {
            id: res.body.id,
            title: res.body.name,
            artist: res.body.artists[0].name,
            album: res.body.album.name,
            cover: res.body.album.images[smallestAlbumCover]?.url,
            uri: res.body.uri,
            duration: res.body.duration_ms,
            popularity: res.body.popularity,
            trackNumber: res.body.track_number,
            discNumber: res.body.disc_number,
            explicit: res.body.explicit,
            previewUrl: res.body.preview_url,
            externalIds: res.body.external_ids
          }
        };
  
        setSongContent(songs);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
  
      return () => cancel = true;
    };
  
    fetchArtistResults();
  }, [firstSongId, accessToken]); */

  return { artistContent, albumContent, songContent };  
};

export default useFetchedContent;