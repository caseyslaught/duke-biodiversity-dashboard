import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

import MapFilter from "../../components/MapFilter";
import useObservations from "../../hooks/useObservations";

import Map from "./components/Map";

const allDisplays = ["Heatmap", "Observations"];
const allCategories = ["Birds", "Insects", "Mammals", "Plants"];
const allMethods = ["Acoustic", "Camera trap", "DNA", "Drone"];
const allLevels = ["Floor", "Understory", "Canopy", "Emergent"];

export default function MapPage({ authenticated }) {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showObs, setShowObs] = useState(true);

  const [filters, setFilters] = useState({
    categories: allCategories.join(),
    methods: allMethods.join(),
    levels: allLevels.join(),
  });

  const observations = useObservations({ authenticated, filters });

  return (
    <Flex flex={1} position="relative">
      <MapFilter
        allDisplays={allDisplays}
        setShowHeatmap={setShowHeatmap}
        setShowObs={setShowObs}
        setFilters={setFilters}
        allCategories={allCategories}
        allLevels={allLevels}
        allMethods={allMethods}
      />
      <Map
        showHeatmap={showHeatmap}
        showObs={showObs}
        observations={observations}
        allMethods={allMethods}
      />
    </Flex>
  );
}
