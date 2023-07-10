import { IReferral, ITableReferral } from "../../../../api";

export const convertITableReferralToIReferral = (
  data: ITableReferral
): IReferral => {
  const {
    commanderName,
    commanderPosition,
    medicalCommanderName,
    medicalCommanderPosition,
    ...restData
  } = data;

  return {
    ...restData,
    commander: {
      fullName: commanderName,
      position: commanderPosition,
    },
    medicalCommander: {
      fullName: medicalCommanderName,
      position: medicalCommanderPosition,
    },
  };
};
