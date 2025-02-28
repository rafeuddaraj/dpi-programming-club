const { auth } = require("./app/auth");

const adminRoute = "/dashboard";
const memberRoute = ["/profile/edit"];
const authPath = "/auth";
const root = "/";

export default auth((request) => {
  const auth = request?.auth;
  const { nextUrl } = request;
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoute);
  const isMemberRoute = memberRoute.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
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
    console.log("I am Matched");

    return Response.redirect(new URL("/auth/login", nextUrl));
  } else if (!["admin", "moderate"].includes(auth?.role) && isAdminRoute) {
    return Response.redirect(new URL("/profile", nextUrl));
  }
});
