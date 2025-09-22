export type Role = 'ROLE_ADMIN' | 'ROLE_CLUB';

export type LoginAPIResponse = {
  role: Role;
  token: string;
};
