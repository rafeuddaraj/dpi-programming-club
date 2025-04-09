export const routeAccessMap = [
  // Public Routes
  {
    paths: ["/auth/login", "/auth/register", "/about", "/contact"],
    roles: [], // No role needed
    isPrivate: false, // Public route
  },

  // Admin Routes
  {
    paths: [
      "/dashboard",
      "/dashboard/events",
      "/dashboard/events/:id",
      "/dashboard/workshops",
      "/dashboard/workshops/:id",
      "/dashboard/skills",
      "/dashboard/assignments",
      "/dashboard/assignments/submissions/:id",
      "/dashboard/member-collect",
      "/dashboard/member-collect/add",
    ],
    roles: ["admin", "moderator"],
    isPrivate: true, // Admin can access all of these
  },

  // Moderator Routes
  {
    paths: [
      "/dashboard/users",
      "/dashboard/users/create",
      "/dashboard/users/:id",
      "/dashboard/users/:id/edit",
      "/dashboard/moderators",
      "/dashboard/moderators/:id",
      "/dashboard/moderators",
      "/dashboard/notice",
      "/dashboard/notice/create",
      "/dashboard/results",
      "/dashboard/settings",
      "/dashboard/events/create",
      "/dashboard/events/:id",
      "/dashboard/events/:id/edit",
      "/dashboard/events/participants",
      "/dashboard/events/participants/:id",
      "/dashboard/workshops/create",
      "/dashboard/workshops/:id",
      "/dashboard/workshops/:id/assignment",
      "/dashboard/workshops/edit/:id",
      "/dashboard/workshops/modules/create",
      "/dashboard/workshops/modules/edit/:id",
      "/dashboard/workshops/lessons/create",
      "/dashboard/workshops/lessons/edit/:id",
      "/dashboard/assignments/:id",
      "/dashboard/assignments/submissions",
      "/dashboard/assignments/submissions/:id",
    ],
    roles: ["admin"],
    isPrivate: true,
  },

  // Profile Route
  {
    paths: ["/profile"],
    roles: ["member", "admin", "moderator"],
    isPrivate: false,
  },
  {
    paths: ["/profile/edit"],
    roles: ["member"],
    isPrivate: true,
  },
];
