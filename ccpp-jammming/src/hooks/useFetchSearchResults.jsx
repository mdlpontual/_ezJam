import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken, market = 'US' }) {
  const [fetchedArtistsArray, setFetchedArtistsArray] = useState([]);
  const [fetchedAlbumsArray, setFetchedAlbumsArray] = useState([]);
  const [fetchedTracksArray, setFetchedTracksArray] = useState([]);
  const [artistFetchCount, setArtistFetchCount] = useState(0);  // Counter for missing artists fetched
  const [albumFetchCount, setAlbumFetchCount] = useState(0);    // Counter for missing albums fetched
  const fetchLimit = 50;  // Set limit for number of missing artists or albums to fetch
  const batchSize = 10;   // Limit for batch fetching
  const delayBetweenBatches = 500; // Delay between fetch batches in ms

  // Sets to track already fetched artists and albums
  const fetchedArtistsSet = new Set(fetchedArtistsArray.map(artist => artist.artistName));
  const fetchedAlbumsSet = new Set(fetchedAlbumsArray.map(album => album.albumTitle));

  //----------------------------------------------------------------------------------------------------------------------------------------------

  // Debounce helper
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

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
          params: {
            market: market,
          },
        });

        const artists = res.data.artists.map((artist) => ({
          artistId: artist.id,
          artistType: artist.type,
          artistName: artist.name,
          artistBanner: artist.images[0]?.url,
          artistProfileImg: artist.images[artist.images.length - 2]?.url,
          artistGenres: artist.genres,
          artistUri: artist.uri,
        }));

        setFetchedArtistsArray(artists);
      } catch (error) {
        console.error("Error fetching artist content:", error);
      }
    };

    // Use debounced version of the fetch
    debounce(fetchArtistContent, 300)();
  }, [searchArtistResults, accessToken]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

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
          params: {
            market: market,
          },
        });

        const albums = res.data.albums.map((album) => ({
          albumId: album.id,
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

    // Use debounced version of the fetch
    debounce(fetchAlbumContent, 300)();
  }, [searchAlbumResults, accessToken]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

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
          params: {
            market: market,
          },
        });

        const tracks = res.data.tracks.map((track) => ({
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

        setFetchedTracksArray(tracks);
      } catch (error) {
        console.error("Error fetching album content:", error);
      }
    };

    // Use debounced version of the fetch
    debounce(fetchTrackContent, 300)();
  }, [searchTrackResults, accessToken]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

  const fetchMissingArtistByName = useCallback(async (artistNames) => {
    if (!artistNames || !accessToken || artistFetchCount >= fetchLimit) return null;

    const uniqueNames = Array.isArray(artistNames) 
      ? artistNames.filter(name => !fetchedArtistsSet.has(name)) 
      : [];

    for (let i = 0; i < uniqueNames.length; i += batchSize) {
      const batch = uniqueNames.slice(i, i + batchSize);

      try {
        const responses = await Promise.all(
          batch.map(async (artistName) => {
            const res = await axios.get(
              `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                params: {
                  market: market,
                },
              }
            );
            return res.data.artists.items[0];
          })
        );

        const newArtists = responses
          .filter(artist => artist)
          .map(artist => ({
            artistId: artist.id,
            artistType: artist.type,
            artistName: artist.name,
            artistBanner: artist.images[0]?.url,
            artistProfileImg: artist.images[artist.images.length - 1]?.url,
            artistGenres: artist.genres,
            artistUri: artist.uri,
          }));

        setFetchedArtistsArray(prev => [...prev, ...newArtists]);
        setArtistFetchCount(prev => prev + newArtists.length);
      } catch (error) {
        console.error("Error fetching missing artists:", error);
      }

      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }, [accessToken, artistFetchCount]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

  const fetchMissingAlbumByName = useCallback(async (albumTitles) => {
    if (!albumTitles || !accessToken || albumFetchCount >= fetchLimit) return null;

    const uniqueTitles = Array.isArray(albumTitles) 
      ? albumTitles.filter(title => !fetchedAlbumsSet.has(title)) 
      : [];

    for (let i = 0; i < uniqueTitles.length; i += batchSize) {
      const batch = uniqueTitles.slice(i, i + batchSize);

      try {
        const responses = await Promise.all(
          batch.map(async (albumTitle) => {
            const res = await axios.get(
              `https://api.spotify.com/v1/search?q=${encodeURIComponent(albumTitle)}&type=album`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                params: {
                  market: market,
                },
              }
            );
            return res.data.albums.items[0];
          })
        );

        const newAlbums = responses
          .filter(album => album)
          .map(album => ({
            albumId: album.id,
            albumAuthor: album.artists[0].name,
            albumTitle: album.name,
            albumType: album.album_type,
            albumCover: album.images[0]?.url,
            albumYear: album.release_date.slice(0, 4),
            albumTotalTracks: album.total_tracks,
            albumExternalUrls: album.external_urls,
            albumUri: album.uri,
          }));

        setFetchedAlbumsArray(prev => [...prev, ...newAlbums]);
        setAlbumFetchCount(prev => prev + newAlbums.length);
      } catch (error) {
        console.error("Error fetching missing albums:", error);
      }

      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }, [accessToken, albumFetchCount]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

  return { fetchedArtistsArray, fetchedAlbumsArray, fetchedTracksArray, fetchMissingArtistByName, fetchMissingAlbumByName };
}

export default useFetchSearchResults;


/* import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken, market = 'US' }) {
  const [fetchedArtistsArray, setFetchedArtistsArray] = useState([]);
  const [fetchedAlbumsArray, setFetchedAlbumsArray] = useState([]);
  const [fetchedTracksArray, setFetchedTracksArray] = useState([]);
  const [artistFetchCount, setArtistFetchCount] = useState(0);  // Counter for missing artists fetched
  const [albumFetchCount, setAlbumFetchCount] = useState(0);    // Counter for missing albums fetched
  const fetchLimit = 50;  // Set limit for number of missing artists or albums to fetch
  const batchSize = 10;   // Limit for batch fetching
  const delayBetweenBatches = 500; // Delay between fetch batches in ms

  // Sets to track already fetched artists and albums
  const fetchedArtistsSet = new Set(fetchedArtistsArray.map(artist => artist.artistName));
  const fetchedAlbumsSet = new Set(fetchedAlbumsArray.map(album => album.albumTitle));

  //----------------------------------------------------------------------------------------------------------------------------------------------

  // Debounce function to reduce rapid triggering of effects
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

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
          params: {
            market: market,
          },
        });

        const artists = res.data.artists.map((artist) => ({
          artistId: artist.id,
          artistType: artist.type,
          artistName: artist.name,
          artistBanner: artist.images[0]?.url,
          artistProfileImg: artist.images[artist.images.length - 2]?.url,
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

  //----------------------------------------------------------------------------------------------------------------------------------------------

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
          params: {
            market: market,
          },
        });

        const albums = res.data.albums.map((album) => ({
          albumId: album.id,
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

  //----------------------------------------------------------------------------------------------------------------------------------------------

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
          params: {
            market: market,
          },
        });

        const tracks = res.data.tracks.map((track) => ({
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

        setFetchedTracksArray(tracks);
      } catch (error) {
        console.error("Error fetching album content:", error);
      }
    };

    fetchTrackContent();
  }, [searchTrackResults, accessToken]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

  const fetchMissingArtistByName = useCallback(async (artistNames) => {
    if (!artistNames || !accessToken || artistFetchCount >= fetchLimit) return null;

    // Ensure artistNames is an array
    const uniqueNames = Array.isArray(artistNames) 
        ? artistNames.filter(name => !fetchedArtistsSet.has(name)) 
        : [];

    for (let i = 0; i < uniqueNames.length; i += batchSize) {
        const batch = uniqueNames.slice(i, i + batchSize);

        try {
            const responses = await Promise.all(
                batch.map(async (artistName) => {
                    const res = await axios.get(
                        `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            params: {
                                market: market,
                            },
                        }
                    );
                    return res.data.artists.items[0];
                })
            );

            const newArtists = responses
                .filter(artist => artist)
                .map(artist => ({
                    artistId: artist.id,
                    artistType: artist.type,
                    artistName: artist.name,
                    artistBanner: artist.images[0]?.url,
                    artistProfileImg: artist.images[artist.images.length - 1]?.url,
                    artistGenres: artist.genres,
                    artistUri: artist.uri,
                }));

            setFetchedArtistsArray(prev => [...prev, ...newArtists]);
            setArtistFetchCount(prev => prev + newArtists.length);
        } catch (error) {
            console.error("Error fetching missing artists:", error);
        }

        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }, [accessToken, artistFetchCount]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

  const fetchMissingAlbumByName = useCallback(async (albumTitles) => {
    if (!albumTitles || !accessToken || albumFetchCount >= fetchLimit) return null;

    // Ensure albumTitles is an array
    const uniqueTitles = Array.isArray(albumTitles) 
        ? albumTitles.filter(title => !fetchedAlbumsSet.has(title)) 
        : [];

    for (let i = 0; i < uniqueTitles.length; i += batchSize) {
        const batch = uniqueTitles.slice(i, i + batchSize);

        try {
            const responses = await Promise.all(
                batch.map(async (albumTitle) => {
                    const res = await axios.get(
                        `https://api.spotify.com/v1/search?q=${encodeURIComponent(albumTitle)}&type=album`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            params: {
                                market: market,
                            },
                        }
                    );
                    return res.data.albums.items[0];
                })
            );

            const newAlbums = responses
                .filter(album => album)
                .map(album => ({
                    albumId: album.id,
                    albumAuthor: album.artists[0].name,
                    albumTitle: album.name,
                    albumType: album.album_type,
                    albumCover: album.images[0]?.url,
                    albumYear: album.release_date.slice(0, 4),
                    albumTotalTracks: album.total_tracks,
                    albumExternalUrls: album.external_urls,
                    albumUri: album.uri,
                }));

            setFetchedAlbumsArray(prev => [...prev, ...newAlbums]);
            setAlbumFetchCount(prev => prev + newAlbums.length);
        } catch (error) {
            console.error("Error fetching missing albums:", error);
        }

        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
  }, [accessToken, albumFetchCount]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

  return { fetchedArtistsArray, fetchedAlbumsArray, fetchedTracksArray, fetchMissingArtistByName, fetchMissingAlbumByName };
}

export default useFetchSearchResults; */


/* import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchSearchResults({ searchArtistResults, searchAlbumResults, searchTrackResults, accessToken, market = 'US' }) {
  const [fetchedArtistsArray, setFetchedArtistsArray] = useState([]);
  const [fetchedAlbumsArray, setFetchedAlbumsArray] = useState([]);
  const [fetchedTracksArray, setFetchedTracksArray] = useState([]);
  const [artistFetchCount, setArtistFetchCount] = useState(0);  // Counter for missing artists fetched
  const [albumFetchCount, setAlbumFetchCount] = useState(0);    // Counter for missing albums fetched
  const fetchLimit = 50;  // Set limit for number of missing artists or albums to fetch

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
          params: {
            market: market,
          },
        });

        const artists = res.data.artists.map((artist) => ({
          artistId: artist.id,
          artistType: artist.type,
          artistName: artist.name,
          artistBanner: artist.images[0]?.url,
          artistProfileImg: artist.images[artist.images.length - 2]?.url,
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
          params: {
            market: market,
          },
        });

        const albums = res.data.albums.map((album) => ({
          albumId: album.id,
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
          params: {
            market: market,
          },
        });

        const tracks = res.data.tracks.map((track) => ({
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
    if (!artistName || !accessToken || artistFetchCount >= fetchLimit) return null;  // Check fetch limit

    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            market: market,
          },
        }
      );

      const artist = res.data.artists.items[0];

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
        setArtistFetchCount((prevCount) => prevCount + 1);  // Increment artist fetch count
        return artistData;
      }

      return null;
    } catch (error) {
      console.error("Error fetching artist content by name:", error);
      return null;
    }
  }, [accessToken, artistFetchCount]);

  //-------------------------------------------------------------------------------------------------------------------

  const fetchMissingAlbumByName = useCallback(async (albumTitle) => {
    if (!albumTitle || !accessToken || albumFetchCount >= fetchLimit) return null;  // Check fetch limit

    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(albumTitle)}&type=album`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            market: market,
          },
        }
      );

      const album = res.data.albums.items[0];

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
        setAlbumFetchCount((prevCount) => prevCount + 1);  // Increment album fetch count
        return albumData;
      }

      return null;
    } catch (error) {
      console.error("Error fetching album content by name:", error);
      return null;
    }
  }, [accessToken, albumFetchCount]);

  //----------------------------------------------------------------------------------------------------------------------------------------------

  return { fetchedArtistsArray, fetchedAlbumsArray, fetchedTracksArray, fetchMissingArtistByName, fetchMissingAlbumByName };
}

export default useFetchSearchResults; */