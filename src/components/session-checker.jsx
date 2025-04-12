"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SessionChecker({ isAuthenticated }) {
  useEffect(() => {
    if (!isAuthenticated) {
      signOut({ redirect: false });
      redirect("/auth/login");
    }
  }, [isAuthenticated]);

  return null;
}
