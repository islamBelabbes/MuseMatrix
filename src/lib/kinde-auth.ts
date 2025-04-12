import { usersDtoMapper } from "@/dto/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthError } from "./error";

export const getCurrentUser = async () => {
  const { isAuthenticated, getRoles, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) throw new AuthError();

  const user = await getUser();
  const roles = await getRoles();

  if (!user) throw new AuthError();

  return usersDtoMapper({ ...user, roles: roles ?? [] });
};
