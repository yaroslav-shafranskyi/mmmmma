import { Request, Response } from 'express';

import { BodyDamageInfo, EvacuationClinic, IForm100 } from '../../../api';
import { db } from '../../init';
import { personsTbl, forms100Tbl } from '../../../constants';

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

    const isNewPerson = personId === 'create';

    const tableBodyDamage = bodyDamage.reduce((_result: Record<BodyDamageInfo, boolean>, current) => ({
        [current]: true,
    }), {});

    const tableEvacuationClinics = evacuation.clinic.reduce((_res: Record<number, EvacuationClinic>, { order, clinic }) => ({ [order]: clinic }), {});

    try {
        await db(forms100Tbl)
            .insert({
                ...form100,
                personId,
                date: date.toISOString(),
                accidentTime: accidentTime.toISOString(),
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
            });

        const { id: newForm100Id } = await db(forms100Tbl)
            .select('id')
            .where({ personId })
            .limit(1)[0] as { id: number; };

        const updatedPerson = {
            ...person,
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

    } catch (message) {
        return console.error(message);
    }

    return res.end();
};