import { useEffect, useState } from "react";

import { ProtectedAPI } from "../api";

const useFlights = ({ authenticated }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ProtectedAPI.get("drone/get_flights");
        if (res.status === 200) {
          const newFlights = res.data.results.map((flight) => ({
            ...flight,
            geojson: flight.geojson ? JSON.parse(flight.geojson) : null,
          }));

          setFlights(newFlights);
        }
      } catch (error) {
        console.log(error);
        setFlights(null); // bad tokens
      }
    }

    if (authenticated) fetchData();
  }, [authenticated]);

  return flights;
};

export default useFlights;
