import React, { useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import useLocalStorage from "../../hooks/useLocalStorage";
import Filters from "./components/Filters";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FyYWNhbCIsImEiOiJja2huM3MxZGYwOHAwMndrOGM2cDB6OW5zIn0.qD5DHPfsRTV2G9aEi30KCw";

// TODO: move map into a child component and manage state in the parent...

export default function MapPage({ droneObservations }) {
  const [lng, setLng] = useLocalStorage("lng", -78.928);
  const [lat, setLat] = useLocalStorage("lat", 36.0165);
  const [zoom, setZoom] = useLocalStorage("zoom", 13);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      //style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      // add source
      map.current.addSource("oval", {
        type: "raster",
        url: "mapbox://caracal.6dxxzba8",
      });

      map.current.addLayer({
        id: "oval",
        source: "oval",
        type: "raster",
      });
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <Flex flex={1} position="relative">
      <Filters />
      <div style={{ height: "100%", width: "100%" }} ref={mapContainer} />
    </Flex>
  );
}
