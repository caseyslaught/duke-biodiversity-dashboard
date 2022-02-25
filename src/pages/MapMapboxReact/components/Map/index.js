import { useEffect, useRef, useState } from "react";
import Map, { Layer, Source } from "react-map-gl";

import useLocalStorage from "../../../../hooks/useLocalStorage";

import CustomMarker from "../CustomMarker";
import CustomPopup from "../CustomPopup";
import { heatmapLayer } from "./style";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MapboxMap = ({ showHeatmap, showObs, observations, allMethods }) => {
  const [lng, setLng] = useLocalStorage("lng", -78.928);
  const [lat, setLat] = useLocalStorage("lat", 36.0165);
  const [zoom, setZoom] = useLocalStorage("zoom", 13);
  const [allGeojson, setAllGeojson] = useState({});
  const [popupData, setPopupData] = useState();
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    console.log(popupData);
  }, [popupData]);

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
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Source id="oval" type="raster" url="mapbox://caracal.6dxxzba8">
        <Layer id="oval" source="oval" type="raster" />
      </Source>

      {showHeatmap && (
        <Source type="geojson" data={allGeojson}>
          <Layer {...heatmapLayer} />
        </Source>
      )}

      {showObs && markers}
      {showObs && popupData && (
        <CustomPopup data={popupData} setPopupData={setPopupData} />
      )}
    </Map>
  );
};

export default MapboxMap;
