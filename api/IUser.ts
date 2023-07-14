import { CorpsDataType } from "./CorpsType";
import { UserType } from "./Permissions";
import { Rank } from "./Rank";

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
  phone?: string;
  email?: string;
  rank?: Rank;
  subdivision?: string;
  corps?: CorpsDataType;
}

export type IUserBrief = Omit<IUser, "password">;
