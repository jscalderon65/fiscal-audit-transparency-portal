import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ROUTES } from "./constants/routes";
import Layout from "./ui/Layout";
import Splash from "./ui/Splash";
import AdminGuard from "./pages/admin/AdminGuard";

const UserLoginPage = lazy(() => import("./pages/user/login"));
const UserDashboard = lazy(() => import("./pages/user/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const Showcase = lazy(() => import("./pages/design-system"));
const AdminLogin = lazy(() => import("./pages/admin/login"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const BuildingsList = lazy(() => import("./pages/admin/buildings"));
const CreateBuilding = lazy(() => import("./pages/admin/buildings/create"));
const EditBuilding = lazy(() => import("./pages/admin/buildings/edit"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ContactMessages = lazy(() => import("./pages/admin/contact-messages"));

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
        <Suspense fallback={<Splash />}>
          <Routes>
            {/* Public routes with global navbar + footer */}
            <Route element={<Layout />}>
              <Route path={ROUTES.HOME} element={<Profile />} />
              <Route path={ROUTES.DESIGN_SYSTEM} element={<Showcase />} />
              <Route path={ROUTES.USER_LOGIN} element={<UserLoginPage />} />
            </Route>

            {/* User dashboard - standalone */}
            <Route path={ROUTES.USER_DASHBOARD} element={<UserDashboard />} />

            {/* Admin panel */}
            <Route path={ROUTES.PANEL_LOGIN} element={<AdminLogin />} />
            <Route path={ROUTES.PANEL_BUILDINGS} element={<AdminRoute><BuildingsList /></AdminRoute>} />
            <Route path={ROUTES.PANEL_BUILDINGS_CREATE} element={<AdminRoute><CreateBuilding /></AdminRoute>} />
            <Route path={ROUTES.PANEL_BUILDINGS_EDIT} element={<AdminRoute><EditBuilding /></AdminRoute>} />
            <Route path={ROUTES.PANEL_CONTACT_MESSAGES} element={<AdminRoute><ContactMessages /></AdminRoute>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
