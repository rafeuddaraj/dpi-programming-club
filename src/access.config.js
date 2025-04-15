export const routeAccessMap = [
  // Public Routes
  {
    paths: [],
    roles: [], // No role needed
    isPrivate: false, // Public route
  },

  {
    paths: [
      "/dashboard",
      "/dashboard/events",
      "/dashboard/workshops",
      "/dashboard/skills",
      "/dashboard/assignments",
    ],
    roles: ["admin", "moderator", "member"],
    isPrivate: true, // Admin can access all of these
  },
  {
    paths: [
      "/dashboard/events/:id",
      "/dashboard/workshops/:id",
      "/dashboard/assignments/submissions/:id",
      "/dashboard/member-collect",
      "/dashboard/member-collect/add",
    ],
    roles: ["admin", "moderator"],
    isPrivate: true, // Admin can access all of these
  },

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
  {
    paths: ["/settings"],
    roles: ["admin", "members"],
    isPrivate: true,
  },
  {
    paths: ["/profile/edit"],
    roles: ["member"],
    isPrivate: true,
  },
];
