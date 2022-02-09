import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/Main";
import ActivityPage from "./pages/Activity";
import MapPage from "./pages/Map";
import MetricsPage from "./pages/Metrics";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate replace to="/activity" />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="metrics" element={<MetricsPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function NoMatch() {
  return <div>OooOoOOooooops! Nothing here.</div>;
}
