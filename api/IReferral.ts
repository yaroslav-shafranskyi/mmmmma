export type PositionWithName = {
  position: string;
  fullName: string;
};

export interface IReferral {
  militaryBase: string;
  code: string;
  date: number;
  militaryBaseAddress: string;
  number: string;
  receiver: string;
  patient: string;
  diagnosis: string;
  commander: PositionWithName;
  medicalCommander: PositionWithName;
  id: number;
  personId: number;
  doctorId: number;
}

export interface ITableReferral
  extends Omit<IReferral, "commander" | "medicalCommander"> {
  commanderName: string;
  commanderPosition: string;
  medicalCommanderName: string;
  medicalCommanderPosition: string;
}
