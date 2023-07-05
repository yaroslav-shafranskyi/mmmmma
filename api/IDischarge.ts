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
    date: Date;
    doctor: string;
}

export interface ITableDischarge extends Omit<IDischarge, 'person' | 'datesData' | 'order' > {
    sickDate: Date;
    referralDate: Date;
    arrivalDate: Date;
    leavingDate: Date;
    personId: number;
    orderDate: Date;
    orderNumber: string;
}
