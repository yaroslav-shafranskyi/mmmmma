export enum UserType {
  USER = "User",
  ADMIN = "Admin",
  SUPER_ADMIN = "SuperAdmin",
  NONE = "None",
}

export interface IAuthorizationResponse {
  role: UserType;
  militaryBase: string;
  user: string;
}

export interface IAuthorizationRequest {
  user: string;
  password: string;
}
