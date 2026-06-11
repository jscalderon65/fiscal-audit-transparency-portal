import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ROUTES } from "./constants/routes";

import UserLoginPage from "./pages/user/login";
import UserDashboard from "./pages/user/dashboard";

import AdministrationLoginPage from "./pages/administration/login";
import AdministrationDashboard from "./pages/administration/dashboard";

import Profile from "./pages/Profile";
import Showcase from "./pages/design-system";

import AdminLogin from "./pages/admin/login";
import AdminLayout from "./pages/admin/AdminLayout";
import BuildingsList from "./pages/admin/buildings";
import CreateBuilding from "./pages/admin/buildings/create";
import EditBuilding from "./pages/admin/buildings/edit";
import AdminGuard from "./pages/admin/AdminGuard";

function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AdminGuard>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Profile />} />

          <Route path={ROUTES.DESIGN_SYSTEM} element={<Showcase />} />

          <Route path={ROUTES.USER_LOGIN} element={<UserLoginPage />} />
          <Route path={ROUTES.USER_DASHBOARD} element={<UserDashboard />} />

          <Route path={ROUTES.ADMIN_LOGIN} element={<AdministrationLoginPage />} />
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdministrationDashboard />} />

          <Route path={ROUTES.PANEL_LOGIN} element={<AdminLogin />} />
          <Route path={ROUTES.PANEL_BUILDINGS} element={<AdminRoute><BuildingsList /></AdminRoute>} />
          <Route path={ROUTES.PANEL_BUILDINGS_CREATE} element={<AdminRoute><CreateBuilding /></AdminRoute>} />
          <Route path={ROUTES.PANEL_BUILDINGS_EDIT} element={<AdminRoute><EditBuilding /></AdminRoute>} />

          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
