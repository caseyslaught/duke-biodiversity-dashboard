import React, { useEffect, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FyYWNhbCIsImEiOiJja2huM3MxZGYwOHAwMndrOGM2cDB6OW5zIn0.qD5DHPfsRTV2G9aEi30KCw";

export default function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-83.5478);
  const [lat, setLat] = useState(8.5588);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      zoom: zoom,
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
    <Flex flex={1}>
      <div
        style={{ height: "100%", width: "100%" }}
        ref={mapContainer}
        className="map-container"
      />
    </Flex>
  );
}
