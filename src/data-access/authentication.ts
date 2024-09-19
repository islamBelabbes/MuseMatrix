import { usersDtoMapper } from "@/dto/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getCurrentUser = async () => {
  const { isAuthenticated, getRoles, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) return null;

  const user = await getUser();
  const roles = await getRoles();

  return usersDtoMapper({ ...user, roles: roles ?? [] });
};
