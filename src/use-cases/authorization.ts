import { TPost } from "@/dto/posts";
import { TUser } from "@/dto/users";

export const isAdminUseCase = (user: TUser) => {
  if (user.roles.find((role) => role.key === "admin")) return true;
  return false;
};
