import { useState, useCallback } from 'react';

// Custom Hook
function usePlayTrack() {
  const [uriTrack, setUriTrack] = useState(null);
  const [uriQueue, setUriQueue] = useState(null);

  // Function to update the shared variable
  const updateUri = useCallback((newUriTrack, newUriQueue) => {
    setUriTrack(newUriTrack);
    setUriQueue(newUriQueue);
  }, []);

  return { uriTrack, uriQueue, updateUri };
}

export default usePlayTrack;
