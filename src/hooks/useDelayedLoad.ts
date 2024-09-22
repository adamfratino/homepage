import { useState, useEffect } from "react";

export const useDelayedLoad = (ms: number = 1000) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), ms);
  }, []);

  return loaded;
};
