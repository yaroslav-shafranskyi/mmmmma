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
    id: number;
    type: Forms;
}

export interface IResponseBriefRecord extends IBriefRecord {
    formId: number;
    personId: number;
}

export interface ILastRecords {
    form100?: number;
    brief?: number;
    discharge?: number;
    referral?: number;
    conclusion?: number;
}
