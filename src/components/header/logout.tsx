"use client";
import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function LogOut() {
  const { isLoading, isAuthenticated } = useKindeBrowserClient();

  if (isLoading || !isAuthenticated) return null;
  return <LogoutLink>Log out</LogoutLink>;
}

export default LogOut;
