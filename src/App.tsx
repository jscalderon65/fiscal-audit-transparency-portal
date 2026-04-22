import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserLoginPage from "./pages/user/login";
import UserDashboard from "./pages/user/dashboard";

import AdministrationLoginPage from "./pages/administration/login";
import AdministrationDashboard from "./pages/administration/dashboard";

import Profile from "./pages/Profile";
import Showcase from "./pages/design-system";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />} />

        <Route path="/desig-system" element={<Showcase />} />

        <Route path="/user/:buildingSlug">
          <Route path="login" element={<UserLoginPage />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        <Route path="/administration">
          <Route path="login" element={<AdministrationLoginPage />} />
          <Route path="dashboard" element={<AdministrationDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
