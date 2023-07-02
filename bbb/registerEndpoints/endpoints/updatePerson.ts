import { Request, Response } from "express";

import { IPerson } from "../../../api";
import { db } from '../../init';
import { personsTbl } from "../../../constants";

export const updatePerson = async(req: Request, res: Response) => {
    const {
        id,
        lastRecords,
        address,
        records,
        ...person
    }: IPerson = req.body;

    try {
        await db(personsTbl)
            .update({
                ...person,
                lastRecords: JSON.stringify(lastRecords),
                updatedAt: Object.values(lastRecords).reduce((max, { date }) => max.getTime() > date.getTime() ? max : date, new Date())
            })
            .where({ id })
    } catch (message) {
        return console.error(message);
    }

    return res.end();
}