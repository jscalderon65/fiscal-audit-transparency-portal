import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransparencyDashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransparencyDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
