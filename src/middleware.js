const { auth } = require("./app/auth");

const adminRoute = "/dashboard";
const memberRoute = [
  "/profile/edit",
  "/profile/dashboard",
  // Add a regular expression pattern to match dynamic segments like workshopId and lessonId
  /^\/workshops\/([^/]+)\/player\/([^/]+)$/, // regex pattern for dynamic parts
];
const authPath = "/auth";
const root = "/";

export default auth((request) => {
  const auth = request?.auth;
  const { nextUrl } = request;
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoute);

  // Check if the current route matches any dynamic member routes
  const isMemberRoute = memberRoute.some((route) => {
    if (typeof route === "string") {
      return nextUrl.pathname.startsWith(route); // for static paths
    }
    // For regex-based dynamic routes
    return route.test(nextUrl.pathname);
  });

  if (!!auth && nextUrl.pathname.startsWith(authPath)) {
    return Response.redirect(
      new URL(
        ["admin", "moderator"].includes(auth?.user?.role)
          ? "/dashboard"
          : "/profile",
        nextUrl
      )
    );
  } else if (!auth && isMemberRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  } else if (!["admin", "moderate"].includes(auth?.role) && isAdminRoute) {
    return Response.redirect(new URL("/profile", nextUrl));
  }
});
