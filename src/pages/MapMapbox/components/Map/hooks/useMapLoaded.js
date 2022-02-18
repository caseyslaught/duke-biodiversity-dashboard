import { useEffect, useState } from "react";

const useMapLoaded = ({ map }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setLoaded(map.current && map.current.loaded());
    }, 1000);
  }, [map]);

  return loaded;
};

export default useMapLoaded;
