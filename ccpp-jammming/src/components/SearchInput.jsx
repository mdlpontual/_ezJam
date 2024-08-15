import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../hooks/useAuth";

const spotifyApi = new SpotifyWebApi({
  clientId: "9ebed4e372ba404ca817a45f1136c5d8",
});

function SearchInput({ code }) {
  const { accessToken, refreshToken, expiresIn } = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchTrackResults, setSearchTrackResults] = useState([]);
  const [searchArtistResults, setSearchArtistResults] = useState([]);
  const [searchAlbumResults, setSearchAlbumResults] = useState([]);
  console.log(searchTrackResults);
  console.log(searchArtistResults);
  console.log(searchAlbumResults);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchTrackResults([]);
    if (!accessToken) return;
    spotifyApi.searchTracks(search).then(res => {
      setSearchTrackResults(res.body.tracks.items.map(track => {
        const smallestAlbumCover = track.album.images.length - 1;
        return {
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          cover: track.album.images[smallestAlbumCover].url,
          uri: track.uri,
          duration: track.duration_ms,
        }
      }));
    }) 
  }, [search, accessToken]);  

  useEffect(() => {
    if (!search) return setSearchArtistResults([]);
    if (!accessToken) return;
    spotifyApi.searchArtists(search).then(res => {
      setSearchArtistResults(res.body.artists.items.map(artist => {
        const smallestProfilePicture = artist.images.length - 1;
        return {
          artist: artist.name,
          profile: artist.images[smallestProfilePicture]
        }
      }));
    })
  }, [search, accessToken]);

   useEffect(() => {
    if (!search) return setSearchAlbumResults([]);
    if (!accessToken) return;
    spotifyApi.searchAlbums(search).then(res => {
      setSearchAlbumResults(res.body.albums.items.map(album => {
        const smallestAlbumCover = album.images.length - 1;
        return {
          artist: album.artists[0].name,
          album: album.name,
          albumType: album.album_type,
          cover: album.images[smallestAlbumCover].url,
          year: album.release_date.slice(0, 4),
          uri: album.uri
        }
      }));
    })
  }, [search, accessToken]); 

  return (
    <>
      <input 
        id="input-elem" 
        type="search" 
        placeholder="Search the Spotify Library" 
        className="col"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </>
  );
};

export default SearchInput;