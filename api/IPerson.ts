import { IAddress } from './IAddress';
import { Gender } from './Gender';
import { ILastRecords, IRecords } from './IRecord';
import { Rank } from './Rank';

export interface IPerson {
    id: string;
    fullName: string;
    personalId: string;
    tokenNumber: string;
    birthDate?: Date;
    rank: Rank;
    gender: Gender;
    militaryBase: string; // TODO declare type
    records: IRecords;
    lastRecords: ILastRecords;
    phoneNumber?: string;
    address?: IAddress;
    profession?: string;
}
