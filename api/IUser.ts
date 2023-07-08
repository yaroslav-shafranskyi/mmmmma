import { UserType } from "./Permissions";

export interface IUser {
  id: number;
  role: UserType;
  fullName?: string;
  militaryBase?: string;
  clinic?: string;
  signature?: string;
  position?: string;
  user: string;
  password: string;
}
