import React, { useEffect, useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import TileLayer from "@arcgis/core/layers/TileLayer";
import * as watchUtils from "@arcgis/core/core/watchUtils";

import useLocalStorage from "../../hooks/useLocalStorage";

import Filters from "./components/Filters";

const { REACT_APP_ARCGIS_API_KEY } = process.env;
esriConfig.apiKey = REACT_APP_ARCGIS_API_KEY;

export default function MapPage() {
  const [lng, setLng] = useLocalStorage("lng", -78.928);
  const [lat, setLat] = useLocalStorage("lat", 36.0165);
  const [zoom, setZoom] = useLocalStorage("zoom", 13);

  return (
    <Flex flex={1} position="relative">
      <Filters />
      <MapContainer
        initLng={lng}
        initLat={lat}
        initZoom={zoom}
        setLng={setLng}
        setLat={setLat}
        setZoom={setZoom}
      />
    </Flex>
  );
}

const MapContainer = ({
  initLng,
  initLat,
  initZoom,
  setLng,
  setLat,
  setZoom,
}) => {
  const viewRef = useRef();
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
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
      container: mapContainerRef.current,
      map: map,
      center: [initLng, initLat],
      zoom: initZoom,
      spatialReference: {
        wkid: 3857,
      },
      constraints: {
        minZoom: 3,
        snapToZoom: false,
      },
    });

    mapRef.current = map;
    viewRef.current = view;

    return () => {
      view && view.destroy();
    };
  }, [initLng, initLat, initZoom]);

  useEffect(() => {
    watchUtils.whenTrue(viewRef.current, "stationary", () => {
      if (viewRef.current.center) {
        const center = viewRef.current.center;
        // using setLng with if (viewRef.current) return; does not work.
        // I do not know why. Maybe something about how map is rendered
        localStorage.setItem("lng", center.longitude);
        localStorage.setItem("lat", center.latitude);
      }

      if (viewRef.current.zoom) {
        localStorage.setItem("zoom", viewRef.current.zoom);
      }

      if (viewRef.current.extent) {
        const extent = viewRef.current.extent;
        const xmin = extent.xmin.toFixed(4);
        const xmax = extent.xmax.toFixed(4);
        const ymin = extent.ymin.toFixed(4);
        const ymax = extent.ymax.toFixed(4);
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
  }, [setLng, setLat, setZoom]);

  return <Box h="100%" w="100%" ref={mapContainerRef} />;
};
