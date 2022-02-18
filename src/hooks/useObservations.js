import { useEffect, useState } from "react";

import { ProtectedAPI } from "../api";

const useObservations = ({ authenticated, filters }) => {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ProtectedAPI.get("web/get_observations", {
          params: {
            categories: filters.categories,
            levels: filters.levels,
            methods: filters.methods,
          },
        });
        if (res.status === 200) {
          setObservations(res.data);
        }
      } catch (error) {
        console.log(error);
        setObservations(null); // bad tokens
      }
    }

    if (authenticated) fetchData();
  }, [authenticated, filters]);

  return observations;
};

export default useObservations;
