export const ROUTES = {
  HOME: "/",

  DESIGN_SYSTEM: "/design-system",

  USER_LOGIN: "/user/:buildingCode/login",
  USER_DASHBOARD: "/user/:buildingCode/dashboard",

  PANEL_LOGIN: "/admin/login",
  PANEL_BUILDINGS: "/admin/buildings",
  PANEL_BUILDINGS_CREATE: "/admin/buildings/create",
  PANEL_BUILDINGS_EDIT: "/admin/buildings/:id/edit",
} as const;
