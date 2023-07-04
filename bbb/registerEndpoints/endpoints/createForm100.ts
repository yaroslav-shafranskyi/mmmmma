import { Request, Response } from "express";

import {
  BodyDamageInfo,
  EvacuationClinic,
  Forms,
  IForm100,
  IPerson,
  IResponseBriefRecord,
} from "../../../api";
import { db } from "../../init";
import { personsTbl, forms100Tbl, briefsTbl } from "../../../constants";

import { convertIPersonToTablePerson } from "../helpers";

const insertNewForm100ToTable = async (data: Omit<IForm100, "id">) => {
  const {
    person,
    date,
    accidentTime,
    bodyImage,
    bodyDamage,
    injury,
    medicalHelp,
    plait,
    evacuation,
    ...form100
  }: Omit<IForm100, "id"> = data;

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

  await db(forms100Tbl).insert({
    ...form100,
    personId,
    date,
    accidentTime,
    damageCoords: JSON.stringify(bodyImage),
    ...tableBodyDamage,
    ...injury,
    ...medicalHelp?.operations,
    ...medicalHelp?.treatments,
    plait: plait?.date,
    evacuationTransport: evacuation.transport,
    evacuationType: evacuation.type,
    evacuationPriority: evacuation.priority,
    evacuationClinics: JSON.stringify(tableEvacuationClinics),
  });
};

const updatePersonAfterFormCreating = async (form100: IForm100) => {
  const { person, accidentTime, id: newForm100Id } = form100;

  const personId = person.id;

  const isNewPerson = personId === -1;

  const { id, ...updatedPerson } = {
    ...convertIPersonToTablePerson(person as IPerson),
    lastForm100Id: newForm100Id,
    updatedAt: accidentTime,
  };

  if (isNewPerson) {
    try {
      await db(personsTbl).insert(updatedPerson);
    } catch (message) {
      return console.error(message);
    }
  }

  if (!isNewPerson) {
    try {
      await db(personsTbl).update(updatedPerson).where({ id: personId });
    } catch (message) {
      return console.error(message);
    }
  }
};

const updateForm100PersonId = async (formId: number, personId: number) => {
  await db(forms100Tbl).update({ personId: personId }).where({ id: formId });
};

const updateBriefsTableAfterFormCreating = async (
  data: Omit<IResponseBriefRecord, "id" | "type">
) => {
  await db(briefsTbl).insert({
    type: Forms.FORM_100,
    ...data,
  });
};

const updateFormsWithPersonId = async (
  data: Pick<IForm100, "id" | "diagnosis" | "fullDiagnosis" | "date">,
  res: Response
) => {
  const { id: newForm100Id, date, diagnosis, fullDiagnosis } = data;

  const newPersonIds = await db(personsTbl)
    .select("id")
    .where({ lastForm100Id: newForm100Id })
    .limit(1);

  const newPersonId = newPersonIds?.[0]?.id;

  if (!newPersonId) {
    return res.end();
  }

  await updateForm100PersonId(newForm100Id, newPersonId);

  await updateBriefsTableAfterFormCreating({
    formId: newForm100Id,
    personId: newPersonId,
    date,
    fullDiagnosis: fullDiagnosis ?? diagnosis ?? "",
  });
};

export const createForm100 = async (req: Request, res: Response) => {
  const {
    person,
    date,
    accidentTime,
    bodyImage,
    bodyDamage,
    injury,
    medicalHelp,
    plait,
    evacuation,
    ...form100
  }: Omit<IForm100, "id"> = req.body;

  const personId = person.id;

  await insertNewForm100ToTable(req.body);

  const formsIds = await db(forms100Tbl)
    .select("id")
    .where({ personId })
    .orderBy("id", "desc");

  if (!formsIds?.length) {
    return res.end();
  }

  const newForm100Id = formsIds[0].id;

  await updatePersonAfterFormCreating({ ...req.body, id: newForm100Id });

  await updateFormsWithPersonId(
    {
      id: newForm100Id,
      diagnosis: form100.diagnosis,
      fullDiagnosis: form100.fullDiagnosis,
      date,
    },
    res
  );

  return res.end();
};
