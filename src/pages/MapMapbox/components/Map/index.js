import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import MarkerAcoustic from "../../../../assets/icons/marker-acoustic.png";
import MarkerCameraTrap from "../../../../assets/icons/marker-camera-trap.png";
import MarkerDna from "../../../../assets/icons/marker-dna.png";
import MarkerDrone from "../../../../assets/icons/marker-drone.png";
import useLocalStorage from "../../../../hooks/useLocalStorage";

import useMapLoaded from "./hooks/useMapLoaded";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FyYWNhbCIsImEiOiJja2huM3MxZGYwOHAwMndrOGM2cDB6OW5zIn0.qD5DHPfsRTV2G9aEi30KCw";

const icons = {
  Acoustic: MarkerAcoustic,
  "Camera trap": MarkerCameraTrap,
  DNA: MarkerDna,
  Drone: MarkerDrone,
};

export default function Map({
  showHeatmap,
  showObs,
  observations,
  allMethods,
}) {
  const [allGeojson, setAllGeojson] = useState({});
  const [methodsGeojsons, setMethodsGeojsons] = useState({});

  const [lng, setLng] = useLocalStorage("lng", -78.928);
  const [lat, setLat] = useLocalStorage("lat", 36.0165);
  const [zoom, setZoom] = useLocalStorage("zoom", 13);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapLoaded = useMapLoaded({ map });

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
      for (const method in icons) {
        map.current.loadImage(icons[method], (error, image) => {
          if (error) throw error;
          map.current.addImage(method, image);
        });
      }

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

  // update geojson
  useEffect(() => {
    const allFeatures = [];
    const newMethdosGeojsons = {};
    for (const method in observations) {
      const methodFeatures = [];
      observations[method].forEach((obs) => {
        const feat = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [obs.longitude, obs.latitude],
          },
          properties: obs,
        };

        methodFeatures.push(feat);
        allFeatures.push(feat);
      });

      newMethdosGeojsons[method] = {
        type: "FeatureCollection",
        features: methodFeatures,
      };
    }

    setMethodsGeojsons(newMethdosGeojsons);
    setAllGeojson({
      type: "FeatureCollection",
      features: allFeatures,
    });
  }, [observations]);

  // update all observations source
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (map.current.getLayer("heatmap")) map.current.removeLayer("heatmap");

    allMethods.forEach((method) => {
      if (map.current.getLayer(method)) map.current.removeLayer(method);
      if (map.current.getSource(method)) map.current.removeSource(method);
    });

    if (map.current.getSource("allObservations"))
      map.current.removeSource("allObservations");

    map.current.addSource("allObservations", {
      type: "geojson",
      data: allGeojson,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points
    });
  }, [allGeojson, methodsGeojsons, mapLoaded, allMethods]);

  // update method observations sources and layers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    allMethods.forEach((method) => {
      if (map.current.getLayer(method)) map.current.removeLayer(method);
      if (map.current.getSource(method)) map.current.removeSource(method);
    });

    if (showObs) {
      for (const method in methodsGeojsons) {
        map.current.addSource(method, {
          type: "geojson",
          data: methodsGeojsons[method],
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        map.current.addLayer({
          id: method,
          type: "symbol",
          source: method,
          layout: {
            "icon-image": method,
            "icon-size": 1,
          },
        });
      }
    }
  }, [showObs, methodsGeojsons, allMethods, mapLoaded]);

  // add heatmap
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (map.current.getLayer("heatmap")) map.current.removeLayer("heatmap");

    let firstSymbolId;
    for (const layer of map.current.getStyle().layers) {
      if (layer.type === "symbol") {
        firstSymbolId = layer.id;
        break;
      }
    }

    if (showHeatmap) {
      map.current.addLayer(
        {
          id: "heatmap",
          type: "heatmap",
          source: "allObservations",
          paint: {
            "heatmap-radius": 100,
            "heatmap-opacity": 0.6,
          },
        },
        firstSymbolId
      );
    }
  }, [showHeatmap, allGeojson, mapLoaded]);

  return <div style={{ height: "100%", width: "100%" }} ref={mapContainer} />;
}
