import { IReferral, ITableReferral } from "../../../api";

export const convertIReferralToITableReferral = ({
  commander,
  medicalCommander,
  ...data
}: IReferral): ITableReferral => ({
  ...data,
  commanderName: commander.fullName,
  commanderPosition: commander.position,
  medicalCommanderName: medicalCommander.fullName,
  medicalCommanderPosition: medicalCommander.position,
});
