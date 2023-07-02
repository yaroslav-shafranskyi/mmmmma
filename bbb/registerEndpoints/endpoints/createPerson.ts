import { Request, Response } from 'express';

import { IPerson } from '../../../api';
import { db } from '../../init';
import { personsTbl } from '../../../constants';

export const createPerson = async (req: Request, res: Response) => {
    const {
        birthDate,
        lastRecords,
        address,
        records,
        ...person
    }: Omit<IPerson, 'id'> = req.body;

    try {
        await db(personsTbl)
            .insert({
                ...person,
                ...address,
                birthDate,
                lastRecords: JSON.stringify(lastRecords),
                updatedAt: Object.values(lastRecords).reduce((max, { date }) => max.getTime() > date.getTime() ? max : date, new Date())
            })
    } catch (message) {
        return console.error(message);
    }

    return res.end();
};
