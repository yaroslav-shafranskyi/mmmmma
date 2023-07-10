import { ICommonFormHeaderFields } from './ICommonFormHeaderFields';
import { IDischargeDates } from './IDischargeDates';
import { IPerson } from './IPerson';

export enum DischargeReason {
    DISCHARGE = 'DISCHARGE',
    DEATH = 'DEATH',
}

export interface IDischarge extends ICommonFormHeaderFields {
    id: number;
    receiver: string;
    person: IPerson;
    datesData: IDischargeDates;
    reason: DischargeReason;
    fullDiagnosis: string;
    info: string;
    recommendations: string;
    date: number;
    doctor: string;
    doctorId: number;
}

export interface ITableDischarge extends Omit<IDischarge, 'person' | 'datesData' | 'order' > {
    sickDate: number;
    referralDate: number;
    arrivalDate: number;
    leavingDate: number;
    personId: number;
    orderDate: number;
    orderNumber: string;
}
