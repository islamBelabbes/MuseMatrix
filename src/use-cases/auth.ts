import { getCurrentUser } from "@/data-access/authentication";
import { TUser } from "@/dto/users";
import { AuthError } from "@/lib/error";

// here both GLOBAL authentication and authorization logic

export const getCurrentUserUseCase = async () => {
  const user = await getCurrentUser();
  if (!user) throw new AuthError();

  return user;
};

export const isAdminUseCase = (user: TUser) => {
  if (user.roles.find((role) => role.key === "admin")) return true;
  return false;
};
