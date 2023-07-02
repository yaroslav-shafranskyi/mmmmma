export type PositionWithName = {
    position: string;
    fullName: string;
}

export interface IReferral {
    militaryBase: string;
    code: string;
    date: Date;
    militaryBaseAddress: string;
    number: string;
    receiver: string;
    patient: string;
    diagnosis: string;
    commander: PositionWithName;
    medicalCommander: PositionWithName;
    id: string;
    personId: string;
}
