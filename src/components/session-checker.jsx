"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionChecker({ isAuthenticated }) {
  useEffect(() => {
    if (!isAuthenticated) {
      signOut({ redirect: true, callbackUrl: "/auth/login" });
    }
  }, [isAuthenticated]);

  return null;
}
