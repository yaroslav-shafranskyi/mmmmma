import { Request, Response } from "express";

import { db } from '../../init';
import { forms100Tbl, personsTbl } from "../../../constants";

export const getForm100 = async (req: Request, res: Response) => {
    const { id, personId } = req.body;

    const isCreateMode = id === undefined || id === 'create';
    const doesPersonExist = personId !== undefined && personId !== 'create';

    try {
        if (!doesPersonExist) {
            return res.json(undefined)
        }

        if (isCreateMode) {
            const data = await db(personsTbl)
                .select(['fullName', 'personalId', 'tokenNumber', 'rank', 'gender', 'militaryBase'])
                .where({ id: personId});
            return res.json({ person: data?.[0] });
        }

        const data = await db(forms100Tbl)
            .select('*')
            .where({ id })
            .andWhere({ personId });
        
        return res.json({ data })

    } catch(error) {
        return console.error(error);
    }
};