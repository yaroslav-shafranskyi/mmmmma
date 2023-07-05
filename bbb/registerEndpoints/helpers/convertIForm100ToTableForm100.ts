import {
  BodyDamageInfo,
  DamageCoordsType,
  EvacuationClinic,
  IForm100,
  IPlait,
  ITableForm100,
} from "../../../api";

export const convertIForm100ToTableForm100 = (
  form: IForm100
): ITableForm100 => {
  const {
    person,
    bodyImage,
    bodyDamage,
    injury,
    medicalHelp,
    plait,
    evacuation,
    ...form100
  } = form;

  const personId = person.id;

  const tableBodyDamage = bodyDamage.reduce(
    (_result: Record<BodyDamageInfo, boolean>, current) => ({
      [current]: true,
    }),
    {}
  );

  const tableEvacuationClinics = evacuation.clinic.reduce(
    (_res: Record<number, EvacuationClinic>, { order, clinic }) => ({
      [order]: clinic,
    }),
    {}
  );

  return {
    ...form100,
    personId,
    damageCoords: JSON.stringify(bodyImage) as unknown as DamageCoordsType,
    ...tableBodyDamage,
    ...injury,
    ...medicalHelp?.operations,
    ...medicalHelp?.treatments,
    plait: plait?.date as unknown as IPlait,
    evacuationTransport: evacuation.transport,
    evacuationType: evacuation.type,
    evacuationPriority: evacuation.priority,
    evacuationClinics: JSON.stringify(tableEvacuationClinics) as {
      [order: number]: EvacuationClinic;
    },
  } as unknown as ITableForm100;
};
