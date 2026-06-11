export const ROUTES = {
  HOME: "/",

  DESIGN_SYSTEM: "/desig-system",

  USER_LOGIN: "/user/:buildingSlug/login",
  USER_DASHBOARD: "/user/:buildingSlug/dashboard",

  ADMIN_LOGIN: "/administration/login",
  ADMIN_DASHBOARD: "/administration/dashboard",

  PANEL_LOGIN: "/admin/login",
  PANEL_BUILDINGS: "/admin/buildings",
  PANEL_BUILDINGS_CREATE: "/admin/buildings/create",
  PANEL_BUILDINGS_EDIT: "/admin/buildings/:id/edit",
} as const;
