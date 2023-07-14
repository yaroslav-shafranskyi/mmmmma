export enum UserType {
  USER = "Лікар",
  SUBDIVISION = "Лікар батальйону",
  MILITARY_BASE = 'Бригадний лікар',
  CORPS = 'Старший лікар роду військ',
  MAIN = 'Головний лікар',
  SUPER_ADMIN = "Старший Адміністратор",
  NONE = "Без доступу",
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
