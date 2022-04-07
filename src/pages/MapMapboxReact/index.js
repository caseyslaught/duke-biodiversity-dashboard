import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

import MapFilter from "../../components/MapFilter";
import useFlights from "../../hooks/useFlights";
import useObservations from "../../hooks/useObservations";

import Map from "./components/Map";

const allDisplays = ["Flights", "Heatmap", "Observations"];
const allCategories = ["Birds", "Insects", "Mammals", "Plants"];
const allMethods = ["Acoustic", "Camera trap", "DNA", "Drone"];
const allLevels = ["Floor", "Understory", "Canopy", "Emergent"];

export default function MapPage({ authenticated }) {
  const [showFlights, setShowFlights] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showObs, setShowObs] = useState(true);

  const [filters, setFilters] = useState({
    categories: allCategories.join(),
    methods: allMethods.join(),
    levels: allLevels.join(),
  });

  const flights = useFlights({ authenticated });
  const observations = useObservations({ authenticated, filters });

  useEffect(() => {
    console.log("flights", flights);
  }, [flights]);

  return (
    <Flex flex={1} position="relative">
      <MapFilter
        allDisplays={allDisplays}
        setShowFlights={setShowFlights}
        setShowHeatmap={setShowHeatmap}
        setShowObs={setShowObs}
        setFilters={setFilters}
        allCategories={allCategories}
        allLevels={allLevels}
        allMethods={allMethods}
      />
      <Map
        showFlights={showFlights}
        showHeatmap={showHeatmap}
        showObs={showObs}
        flights={flights}
        observations={observations}
        allMethods={allMethods}
      />
    </Flex>
  );
}
