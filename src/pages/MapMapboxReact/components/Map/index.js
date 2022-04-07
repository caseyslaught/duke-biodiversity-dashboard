/* eslint import/no-webpack-loader-syntax: off */
import { useEffect, useRef, useState } from "react";

import Map, { Layer, Source } from "react-map-gl";
import mapboxgl from "mapbox-gl";

import useLocalStorage from "../../../../hooks/useLocalStorage";

import CustomMarker from "../CustomMarker";
import CustomPopup from "../CustomPopup";
import { heatmapLayer } from "./style";

mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MapboxMap = ({
  showFlights,
  showHeatmap,
  showObs,
  flights,
  observations,
  allMethods,
}) => {
  const [lng, setLng] = useLocalStorage("lng", -78.928);
  const [lat, setLat] = useLocalStorage("lat", 36.0165);
  const [zoom, setZoom] = useLocalStorage("zoom", 13);
  const [allGeojson, setAllGeojson] = useState({});
  const [popupData, setPopupData] = useState();
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef();

  // add flights as layer...

  useEffect(() => {
    console.log(flights);
  }, [flights]);

  useEffect(() => {
    const allFeatures = [];
    const newMarkers = [];
    for (const method in observations) {
      observations[method].forEach((obs) => {
        const feat = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [obs.longitude, obs.latitude],
          },
          properties: {
            ...obs,
          },
        };
        allFeatures.push(feat);
        newMarkers.push(
          <CustomMarker
            key={obs.uid}
            data={obs}
            setPopupData={setPopupData}
            method={method}
          />
        );
      });
    }
    setMarkers(newMarkers);
    setAllGeojson({
      type: "FeatureCollection",
      features: allFeatures,
    });
  }, [observations]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: zoom,
      }}
      onClick={() => {
        setPopupData(null);
      }}
      onMove={() => {
        setLng(mapRef.current.getCenter().lng.toFixed(4));
        setLat(mapRef.current.getCenter().lat.toFixed(4));
        setZoom(mapRef.current.getZoom().toFixed(2));
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      //mapStyle="mapbox://styles/mapbox/light-v8"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {/* TODO: programmatically get layers */}
      <Source id="oval" type="raster" url="mapbox://caracal.6dxxzba8">
        <Layer id="oval" source="oval" type="raster" />
      </Source>

      <Source id="crash" type="raster" url="mapbox://caracal.3pedi9q0">
        <Layer id="crash" source="crash" type="raster" />
      </Source>

      {showHeatmap && (
        <Source id="allObservations" type="geojson" data={allGeojson}>
          <Layer {...heatmapLayer} />
        </Source>
      )}

      {showFlights &&
        flights.map((flight) => (
          <Source
            key={flight.uid}
            id={`flight-${flight.uid}`}
            type="geojson"
            data={flight.geojson}
          >
            <Layer
              id={`flight-${flight.uid}`}
              type="line"
              source={`flight-${flight.uid}`}
              paint={{
                "line-color": "#9119b3",
                "line-width": 3,
              }}
            />
          </Source>
        ))}

      {showObs && markers}
      {showObs && popupData && (
        <CustomPopup data={popupData} setPopupData={setPopupData} />
      )}
    </Map>
  );
};

export default MapboxMap;
