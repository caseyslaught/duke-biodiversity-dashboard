import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import useObservations from "../../hooks/useObservations";

import Filters from "./components/Filters";
import Map from "./components/Map";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FyYWNhbCIsImEiOiJja2huM3MxZGYwOHAwMndrOGM2cDB6OW5zIn0.qD5DHPfsRTV2G9aEi30KCw";

const allCategories = ["Birds", "Insects", "Mammals", "Plants"];
const allMethods = ["Acoustic", "Camera trap", "DNA", "Drone"];
const allLevels = ["Floor", "Understory", "Canopy", "Emergent"];

export default function MapPage({ authenticated }) {
  const [display, setDisplay] = useState("highlights");
  const [filters, setFilters] = useState({
    categories: allCategories.join(),
    methods: allMethods.join(),
    levels: allLevels.join(),
  });

  const observations = useObservations({ authenticated, filters });

  return (
    <Flex flex={1} position="relative">
      <Filters
        filters={filters}
        setFilters={setFilters}
        allCategories={allCategories}
        allLevels={allLevels}
        allMethods={allMethods}
        display={display}
        setDisplay={setDisplay}
      />
      <Map observations={observations} />
    </Flex>
  );
}
