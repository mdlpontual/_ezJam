import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../hooks/useAuth";

const spotifyApi = new SpotifyWebApi({
  clientId: "9ebed4e372ba404ca817a45f1136c5d8",
});

function SearchInput({ code }) {
  const { accessToken, refreshToken, expiresIn } = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    spotifyApi.searchArtists(search).then(res => {
      console.log('tracks search test: ', res.body.artists.items);
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
