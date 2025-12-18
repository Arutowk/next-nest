import { createAuth, getConfig } from "chat-api/auth";

export const auth = createAuth(getConfig());
