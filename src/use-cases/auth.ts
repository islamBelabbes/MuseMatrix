import { getCurrentUser } from "@/data-access/authentication";
import { TUser } from "@/dto/users";

// here both GLOBAL authentication and authorization logic

export const getCurrentUserUseCase = async () => {
  return await getCurrentUser();
};

export const isAdminUseCase = (user: TUser) => {
  if (user.roles.find((role) => role.key === "admin")) return true;
  return false;
};
