import { ICommonFormHeaderFields } from './ICommonFormHeaderFields';
import { IPerson } from './IPerson';

export type ConclusionPersonDataType = Pick<IPerson, 'id' | 'fullName' | 'birthDate'>;

export interface IConclusion extends ICommonFormHeaderFields {
    id: string;
    person: ConclusionPersonDataType;
    sender: string;
    doctor: string;
    labResults: string;
    researchResults: string;
    diagnosis: string;
    recommendations: string;
    date: Date;
    signature: string;
    headOfTheClinic: string;
}
