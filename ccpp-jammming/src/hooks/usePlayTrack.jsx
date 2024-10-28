import { useState, useCallback } from 'react';

// Custom Hook
function usePlayTrack() {
  const [uriTrack, setUriTrack] = useState(null);
  const [uriQueue, setUriQueue] = useState(null);
  const [customUriQueue, setCustomUriQueue] = useState(null);

  // Function to update the shared variable
  const updateUri = useCallback((newUriTrack, newUriQueue) => {
    setUriTrack(newUriTrack);
    setUriQueue(newUriQueue);
  }, []);

  const updateQueue = useCallback((newUriQueue) => {
    setUriQueue(newUriQueue);
    setCustomUriQueue(newUriQueue);
  }, []);

  return { uriTrack, uriQueue, customUriQueue, setUriQueue, updateUri, updateQueue };
}

export default usePlayTrack;
