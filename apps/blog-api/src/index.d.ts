import type { User as Usertype } from "./generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: Usertype; // 这样 req.user 就有类型了
    }
  }

  type GqlContext = {
    req: Request & { user: Usertype };
  };
}
