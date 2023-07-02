import { IPerson } from "../../../api";

export const convertTablePersonToIPerson = (tablePerson: Record<string, unknown>): IPerson => {
    const { oblast, region, settlement, street, building, appartments, updatedAt, ...restFields } = tablePerson;
    
    return {
        ...restFields as unknown as IPerson,
        address: {
            oblast: oblast as string,
            region: region as string,
            settlement: settlement as string,
            building: building as string,
            street: street as string,
            appartments: appartments as string
        }
    };
};
