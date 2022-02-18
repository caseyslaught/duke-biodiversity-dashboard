import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import MarkerBlue from "../../../../assets/icons/marker-blue.png";

import useLocalStorage from "../../../../hooks/useLocalStorage";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FyYWNhbCIsImEiOiJja2huM3MxZGYwOHAwMndrOGM2cDB6OW5zIn0.qD5DHPfsRTV2G9aEi30KCw";

export default function Map({ observations }) {
  const [lng, setLng] = useLocalStorage("lng", -78.928);
  const [lat, setLat] = useLocalStorage("lat", 36.0165);
  const [zoom, setZoom] = useLocalStorage("zoom", 13);
  const [geojson, setGeojson] = useState({});
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    const features = [];
    for (const method in observations) {
      observations[method].forEach((obs) => {
        const { uid, longitude, latitude, datetime_created } = obs;
        features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          properties: {
            id: uid,
            title: `${datetime_created}`,
            description: `${method} observation @ ${datetime_created}`,
            method,
          },
        });
      });
    }

    setGeojson({
      type: "FeatureCollection",
      features,
    });
  }, [observations]);

  useEffect(() => {
    if (!map.current) return;

    setTimeout(() => {
      if (map.current.getLayer("heatmap")) map.current.removeLayer("heatmap");
      if (map.current.getLayer("observations"))
        map.current.removeLayer("observations");
      if (map.current.getSource("observations"))
        map.current.removeSource("observations");

      map.current.addSource("observations", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });

      map.current.addLayer({
        id: "heatmap",
        type: "heatmap",
        source: "observations",
        paint: {
          "heatmap-radius": 100,
          "heatmap-opacity": 0.6,
        },
      });

      map.current.addLayer({
        id: "observations",
        type: "symbol",
        source: "observations", // reference the data source
        layout: {
          "icon-image": "cat", // reference the image
          "icon-size": 1,
        },
      });
    }, 1000);
  }, [geojson]);

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
      map.current.loadImage(MarkerBlue, (error, image) => {
        if (error) throw error;
        map.current.addImage("cat", image);
      });

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

  return <div style={{ height: "100%", width: "100%" }} ref={mapContainer} />;
}
