import { useEffect, useState } from "react";

import { ProtectedAPI } from "../api";

const useDroneObservations = ({ authenticated }) => {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ProtectedAPI.get("drone/get_observations");
        if (res.status === 200) {
          setObservations(res.data.results);
        }
      } catch (error) {
        console.log(error);
        setObservations(null); // bad tokens
      }
    }

    if (authenticated) fetchData();
  }, [authenticated]);

  return observations;
};

export default useDroneObservations;
