import { Request, Response } from 'express';

import { IPerson } from '../../../api';
import { db } from '../../init';
import { personsTbl } from '../../../constants';

import { convertIPersonToTablePerson } from '../helpers';

export const createPerson = async (req: Request, res: Response) => {
    const person: Omit<IPerson, 'id'> = req.body;

    try {
        await db(personsTbl)
            .insert(convertIPersonToTablePerson(person))
    } catch (message) {
        return console.error(message);
    }

    return res.end();
};
