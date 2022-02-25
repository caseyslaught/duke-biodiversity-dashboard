import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import useAuthenticated from "./hooks/useAuthenticated";

import MainLayout from "./layouts/Main";
import ActivityPage from "./pages/Activity";
// import MapPage from "./pages/Map";
//import MapPage from "./pages/MapMapbox";
import MapPage from "./pages/MapMapboxReact";

import MetricsPage from "./pages/Metrics";

export default function App() {
  const [authenticated, setAuthenticated] = useAuthenticated();

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
          element={<ActivityPage authenticated={authenticated} />}
        />
        <Route path="map" element={<MapPage authenticated={authenticated} />} />
        <Route path="metrics" element={<MetricsPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function NoMatch() {
  return <div>OooOoOOooooops! Nothing here.</div>;
}
