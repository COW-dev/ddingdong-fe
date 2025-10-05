export const ROLE_TYPE = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_CLUB: 'ROLE_CLUB',
};

export type RoleType = typeof ROLE_TYPE;
export type Role = (typeof ROLE_TYPE)[keyof typeof ROLE_TYPE];
