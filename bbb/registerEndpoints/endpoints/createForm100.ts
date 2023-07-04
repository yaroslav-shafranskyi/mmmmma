import { Request, Response } from 'express';

import { BodyDamageInfo, EvacuationClinic, Forms, IForm100, IPerson } from '../../../api';
import { db } from '../../init';
import { personsTbl, forms100Tbl, briefsTbl } from '../../../constants';

import { convertIPersonToTablePerson } from '../helpers';

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
    }: Omit<IForm100, 'id'> = req.body;

    const personId = person.id;

    const isNewPerson = personId === -1;

    const tableBodyDamage = bodyDamage.reduce((_result: Record<BodyDamageInfo, boolean>, current) => ({
        [current]: true,
    }), {});

    const tableEvacuationClinics = evacuation.clinic.reduce((_res: Record<number, EvacuationClinic>, { order, clinic }) => ({ [order]: clinic }), {});

    try {
        await db(forms100Tbl)
            .insert({
                ...form100,
                personId,
                date,
                accidentTime,
                damageCoords: JSON.stringify(bodyImage),
                ...tableBodyDamage,
                ...injury,
                ...medicalHelp?.operations,
                ...medicalHelp?.treatments,
                plait: plait?.date?.toISOString(),
                evacuationTransport: evacuation.transport,
                evacuationType: evacuation.type,
                evacuationPriority: evacuation.priority,
                evacuationClinics: JSON.stringify(tableEvacuationClinics)
            })

        const formsIds = await db(forms100Tbl)
            .select('id')
            .where({ personId })
            .limit(1);

        if (!formsIds?.length) {
            return res.end();
        }

        const newForm100Id = formsIds[0].id

        const { id, ...updatedPerson } = {
            ...convertIPersonToTablePerson(person as IPerson),
            lastForm100Id: newForm100Id,
            updatedAt: accidentTime,
        };
        
        if (isNewPerson) {
            try {
                await db(personsTbl).insert(updatedPerson)
            } catch (message) {
                return console.error(message);
            }
        }

        if (!isNewPerson) {
            try {
                await db(personsTbl)
                    .update(updatedPerson)
                    .where({ id: personId })
            } catch (message) {
                return console.error(message);
            }
        }

        const newPersonIds = await db(personsTbl)
            .select('id')
            .where({ lastForm100Id: newForm100Id })
            .limit(1);

        const newPersonId = newPersonIds?.[0]?.id;

        if (!newPersonId) {
            return res.end();
        }

        await db(forms100Tbl)
            .update({ personId: newPersonId })
            .where({ id: newForm100Id });
        
        await db(briefsTbl)
            .insert({
                type: Forms.FORM_100,
                formId: newForm100Id,
                date,
                fullDiagnosis: form100.fullDiagnosis,
                personId: newPersonId,
            });

    } catch (message) {
        return console.error(message);
    }

    return res.end();
};
