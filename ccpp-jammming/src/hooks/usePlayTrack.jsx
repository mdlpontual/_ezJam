import { useState, useCallback } from 'react';

// Custom Hook
function usePlayTrack() {
  const [uriTrack, setUriTrack] = useState(null);

  // Function to update the shared variable
  const updateUriTrack = useCallback((newValue) => {
    setUriTrack(newValue);
  }, []);

  return { uriTrack, updateUriTrack };
}

export default usePlayTrack;
