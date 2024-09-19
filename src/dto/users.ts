import { KindeRoles, KindeUserBase } from "@kinde-oss/kinde-auth-nextjs/types";

type TUserParams = KindeUserBase & {
  roles: KindeRoles;
};

export const usersDtoMapper = (user: TUserParams) => {
  return user;
};

export type TUser = ReturnType<typeof usersDtoMapper>;
