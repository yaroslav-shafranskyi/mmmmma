import { BodyDamageInfo } from "./BodyDamageInfo";
import { IBodyImage } from "./IBodyImage";
import {
  EvacuationClinic,
  EvacuationPriority,
  EvacuationTransport,
  EvacuationType,
  IEvacuation,
} from "./IEvacuation";
import { IInjury } from "./IInjury";
import { IMedicalHelp, IMedicalOperations, ITreatments } from "./IMedicalHelp";
import { IPerson } from "./IPerson";
import { IPlait } from "./IPlait";
import { RecordType } from "./IRecord";
import { SanitaryTreatmentStatus } from "./SanitaryTreatmentStatus";

export type Form100PersonData = Pick<
  IPerson,
  | "birthDate"
  | "id"
  | "fullName"
  | "personalId"
  | "tokenNumber"
  | "rank"
  | "gender"
  | "militaryBase"
>;

export interface IForm100 {
  id: number;
  clinic: string;
  author: string;
  person: Form100PersonData;
  date: Date;
  accidentTime: Date;
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

type DamageCoordType = { x: number; y: number };
type DamageCoordsType = { front: DamageCoordType[]; back: DamageCoordType[] };

export interface ITableForm100
  extends IForm100,
    IInjury,
    ITreatments,
    IMedicalOperations {
  BONES?: boolean | null;
  BURN: boolean | null;
  CAVITY_WOUNDS: boolean | null;
  SOFT_TISSUES: boolean | null;
  VESSELS: boolean | null;
  evacuationClinics: { [order: number]: EvacuationClinic };
  evacuationPriority: EvacuationPriority;
  evacuationTransport: EvacuationTransport;
  evacuationType: EvacuationType;
  personId: number;
  damageCoords?: DamageCoordsType;
}
