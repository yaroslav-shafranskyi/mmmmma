import { IConclusion, IUserBrief } from "../../../../api";

export const convertUserDataToConclusionDoctorData = (
  userData?: IUserBrief
): Partial<IConclusion> => {
  const { fullName, position, clinic: sender, signature, id: doctorId } = userData ?? {};

  return {
    doctor: `${position} ${fullName}`,
    sender,
    doctorName: fullName,
    signature,
    doctorId,
  };
};
