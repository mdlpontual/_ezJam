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
      if (!firstAlbumId) return setAlbumContent([]);
      if (!accessToken) return;
  
      try {
        let cancel = false;
  
        const res = await spotifyApi.getAlbum(firstAlbumId);
        if (cancel) return;

        const albums = () => {
          const smallestAlbumCover = res.body.images.length - 1;
          return {
            id: res.body.id,
            artist: res.body.artists[0].name,
            album: res.body.name,
            albumType: res.body.album_type,
            cover: res.body.images[smallestAlbumCover]?.url,
            year: res.body.release_date.slice(0, 4),
            uri: res.body.uri,
            totalTracks: res.body.total_tracks,
            externalUrls: res.body.external_urls
          }
        };
  
        setAlbumContent(albums);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
  
      return () => cancel = true;
    };
  
    fetchArtistResults();
  }, [firstAlbumId, accessToken]);

  useEffect(() => {
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
  }, [firstSongId, accessToken]);

  return { artistContent, albumContent, songContent };  
};

export default useFetchedContent;


































/*

const [searchArtistResults, setSearchArtistResults] = useState([]);
    const [searchAlbumResults, setSearchAlbumResults] = useState([]);
    const [searchTrackResults, setSearchTrackResults] = useState([]);

    useEffect(() => {
      if (!accessToken) return;
      spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
      const fetchArtistResults = async () => {
        if (!search) return setSearchArtistResults([]);
        if (!accessToken) return;
    
        try {
          let cancel = false;
    
          const res = await spotifyApi.searchArtists(search);
          if (cancel) return;


          const artists = res.body.artists.items.map(artist => {
            const smallestProfilePicture = artist.images.length - 1;
            return {
              id: artist.id,
              type: artist.type,
              artist: artist.name,
              cover: artist.images[0]?.url,
              profile: artist.images[smallestProfilePicture]?.url,
              genres: artist.genres,
              uri: artist.uri
            }
          });
    
          setSearchArtistResults(artists);
        } catch (error) {
          console.error('Error fetching artists:', error);
        }
    
        return () => cancel = true;
      };
    
      fetchArtistResults();
    }, [search, accessToken]);
    
    useEffect(() => {
      const fetchAlbumResults = async () => {
        if (!search) return setSearchAlbumResults([]);
        if (!accessToken) return;
    
        try {
          let cancel = false;
    
          const res = await spotifyApi.searchAlbums(search);
          if (cancel) return;
    
          const albums = res.body.albums.items.map(album => {
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
              externalUrls: album.external_urls
            };
          });
    
          setSearchAlbumResults(albums);
        } catch (error) {
          console.error('Error fetching albums:', error);
        }
    
        return () => cancel = true;
      };
    
      fetchAlbumResults();
    }, [search, accessToken]);
    
    useEffect(() => {
      const fetchTrackResults = async () => {
        if (!search) return setSearchTrackResults([]);
        if (!accessToken) return;
    
        try {
          let cancel = false;
    
          const res = await spotifyApi.searchTracks(search);
          if (cancel) return;
    
          const tracks = res.body.tracks.items.map(track => {
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
              externalIds: track.external_ids
            };
          });
    
          setSearchTrackResults(tracks);
        } catch (error) {
          console.error('Error fetching tracks:', error);
        }
    
        return () => cancel = true;
      };
    
      fetchTrackResults();
    }, [search, accessToken]);
    
    return { searchArtistResults, searchAlbumResults, searchTrackResults };  

*/