export enum UserType {
  USER = "Базовий",
  ADMIN = "Адміністратор",
  SUPER_ADMIN = "Страший адміністратор",
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
