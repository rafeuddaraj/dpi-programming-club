import { match } from "path-to-regexp";
import { routeAccessMap } from "./access.config";

const { auth } = require("./app/auth");

export default auth((request) => {
  const user = request?.auth?.user;
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/auth");
  const isDashboardPage = pathname.startsWith("/dashboard");

  // Match route from access config
  const matchedRoute = routeAccessMap.find(({ paths }) =>
    paths.some((path) => match(path, { decode: decodeURIComponent })(pathname))
  );

  // If user is logged in and tries to visit auth page
  if (user && isAuthPage) {
    const redirectTo = ["admin", "moderator"].includes(user?.role)
      ? "/dashboard"
      : "/profile";
    return Response.redirect(new URL(redirectTo, nextUrl));
  }

  // If user is not logged in and trying to access a private route
  if (matchedRoute && !user && matchedRoute.isPrivate) {
    // If trying to access the login page, don't redirect again
    if (pathname === "/auth/login" || pathname === "/auth/register") {
      return; // Stop here, don't redirect
    }
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // If user is logged in but doesn't have permission for this route
  if (matchedRoute && !matchedRoute.roles.includes(user?.role)) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  // Allow access to the route if all checks pass
});
