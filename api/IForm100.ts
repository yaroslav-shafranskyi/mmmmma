import { BodyDamageInfo } from './BodyDamageInfo';
import { IBodyImage } from './IBodyImage';
import { IEvacuation } from './IEvacuation';
import { IInjury } from './IInjury';
import { IMedicalHelp } from './IMedicalHelp';
import { IPerson } from './IPerson';
import { IPlait } from './IPlait';
import { RecordType } from './IRecord';
import { SanitaryTreatmentStatus } from './SanitaryTreatmentStatus';

export interface IForm100 {
    id: string;
    clinic: string;
    author: string;
    person: IPerson;
    date: Date;
    reason: RecordType;
    bodyImage: IBodyImage;
    bodyDamage: BodyDamageInfo[];
    injury?: IInjury;
    medicalHelp?: IMedicalHelp;
    plait?: IPlait;
    sanitaryTreatment: SanitaryTreatmentStatus;
    evacuation: IEvacuation;
    diagnosis: string;
    signature?: string;
    stage: string;
    fullDiagnosis: string;
    treatmentInfo: string;
    fullEvacuationInfo: string;
    result: string;
    selfLeave?: boolean;
    carriedBy?: string;
    timeAfterAccident?: number;
    firstAidInfo: string;
}
