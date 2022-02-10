import React, { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import Point from "@arcgis/core/geometry/Point";
import SceneView from "@arcgis/core/views/SceneView";
import TileLayer from "@arcgis/core/layers/TileLayer";
import * as watchUtils from "@arcgis/core/core/watchUtils";

import useLocalStorage from "../../hooks/useLocalStorage";

esriConfig.apiKey =
  "AAPK2551eab2c5a44d1984a7226b4fd400deFAhr5N7NHB1ImvFiQrNVAf1LxZd0nyIu1EzYGjiPA1nsVuMlf0dw7NInOEaLMZYm";

export default function MapPage() {
  return (
    <Flex flex={1}>
      <MapContainer />
    </Flex>
  );
}

const MapContainer = () => {
  const mapRef = useRef();
  const [lng, setLng] = useLocalStorage("lng", -78.928);
  const [lat, setLat] = useLocalStorage("lat", 36.0165);
  const [zoom, setZoom] = useLocalStorage("zoom", 13);

  useEffect(() => {
    console.log(mapRef.current);

    const map = new Map({
      basemap: "hybrid",
    });

    const layer = new TileLayer({
      url: "https://tiles.arcgis.com/tiles/gNxCsTcw53J7CAhV/arcgis/rest/services/OrthoLayer/MapServer",
      opacity: 1,
      visible: true,
    });

    map.add(layer);

    const view = new SceneView({
      container: mapRef.current,
      map: map,
      center: [lng, lat],
      zoom: zoom,
      spatialReference: {
        wkid: 3857,
      },
      constraints: {
        minZoom: 3,
        snapToZoom: false,
      },
    });

    watchUtils.whenTrue(view, "stationary", () => {
      // Get the new center of the view only when view is stationary.
      if (view.center) {
        setLng(view.center.longitude);
        setLat(view.center.latitude);
      }

      if (view.zoom) {
        setZoom(view.zoom);
      }

      if (view.extent) {
        const xmin = view.extent.xmin.toFixed(4);
        const xmax = view.extent.xmax.toFixed(4);
        const ymin = view.extent.ymin.toFixed(4);
        const ymax = view.extent.ymax.toFixed(4);
        localStorage.setItem(
          "extent",
          JSON.stringify({
            xmin,
            xmax,
            ymin,
            ymax,
          })
        );
      }
    });

    return () => {
      view && view.destroy();
    };
  }, []);

  return <Box h="100%" w="100%" ref={mapRef} />;
};
