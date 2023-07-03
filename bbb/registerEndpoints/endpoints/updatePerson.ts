import { Request, Response } from "express";

import { IPerson } from "../../../api";
import { db } from '../../init';
import { personsTbl } from "../../../constants";

import { convertIPersonToTablePerson } from '../helpers';

export const updatePerson = async(req: Request, res: Response) => {
    const person: IPerson = req.body;

    try {
        await db(personsTbl)
            .update(convertIPersonToTablePerson(person))
            .where({ id: person.id })
    } catch (message) {
        return console.error(message);
    }

    return res.end();
}