import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import useAuthenticated from "./hooks/useAuthenticated";
import useDroneObservations from "./hooks/useDroneObservations";

import MainLayout from "./layouts/Main";
import ActivityPage from "./pages/Activity";
// import MapPage from "./pages/Map";
import MapPage from "./pages/MapMapbox";
import MetricsPage from "./pages/Metrics";

export default function App() {
  const [authenticated, setAuthenticated] = useAuthenticated();
  const droneObservations = useDroneObservations({ authenticated });

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        }
      >
        <Route index element={<Navigate replace to="/activity" />} />
        <Route
          path="activity"
          element={<ActivityPage droneObservations={droneObservations} />}
        />
        <Route
          path="map"
          element={<MapPage droneObservations={droneObservations} />}
        />
        <Route path="metrics" element={<MetricsPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function NoMatch() {
  return <div>OooOoOOooooops! Nothing here.</div>;
}
