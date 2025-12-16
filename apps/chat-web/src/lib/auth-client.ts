import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { BACKEND_BASE_URL } from "./default";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: BACKEND_BASE_URL,
  plugins: [nextCookies()],
});
