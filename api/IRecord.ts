import { IConclusion } from './IConclusion';
import { Forms } from './Forms';
import { IDischarge } from './IDischarge';
import { IForm100 } from './IForm100';
import { IReferral } from './IReferral';

export enum RecordType {
    INJURY = 'injury',
    SICK = 'sick'
}

export type IForm100Record = Omit<IForm100, 'person'>;

export type IDischargeRecord = Omit<IDischarge, 'person'>;

export type IReferralRecord = Omit<IReferral, 'personId'>;

export type IConclusionRecord = Omit<IConclusion, 'person'>

export interface IBriefRecord {
    date: Date;
    fullDiagnosis: string;
    id: string;
    type: Forms;
}

export interface ILastRecords {
    form100?: IForm100Record;
    brief?: IBriefRecord;
    discharge?: IDischargeRecord;
    referral?: IReferralRecord;
    conclusion?: IConclusionRecord;
}

export interface IRecords {
    form100: IForm100Record[];
    brief: IBriefRecord[];
    discharge: IDischargeRecord[];
    referral: IReferralRecord[];
    conclusion: IConclusionRecord[];
}
