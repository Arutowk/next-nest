import { z } from "zod";

export const BaseSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export const AddFriednSchema = BaseSchema.refine(
  (data) => {
    const isNamePresent = data.name !== undefined && data.name !== "";
    const isEmailPresent = data.email !== undefined && data.email !== "";

    return isNamePresent || isEmailPresent;
  },
  {
    message: "name or email at least one",
    // （可选）可以指定哪个字段应该显示这个错误。
    // 如果不指定 path，错误会出现在整个对象上。
    path: ["name", "email"],
  },
);

// 自动推断 TypeScript 类型
export type UserFriend = z.infer<typeof AddFriednSchema>;
