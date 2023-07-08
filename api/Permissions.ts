export enum UserType {
  USER = "User",
  ADMIN = "Admin",
  SUPER_ADMIN = "SuperAdmin",
  NONE = "None",
}

export interface IAuthorizationResponse {
  role: UserType;
  militaryBase: string;
}
