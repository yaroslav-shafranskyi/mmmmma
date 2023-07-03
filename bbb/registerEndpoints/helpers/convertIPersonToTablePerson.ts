import { IPerson } from "../../../api";

type PersonType = Omit<IPerson, 'id'> & {
    id?: number | 'create',
};

export const convertIPersonToTablePerson = (person: PersonType) => {
    const {
        lastRecords,
        address,
        records,
        ...restPerson
    } = person;

    const {
        form100: lastForm100Id,
        discharge: lastDischargeId,
        conclusion: lastConclusionId,
        referral: lastReferralId
    } = lastRecords;

    return {
        ...person,
        ...address,
        lastForm100Id,
        lastDischargeId,
        lastConclusionId,
        lastReferralId,
        updatedAt: Object.values(lastRecords).reduce((max, { date }) => max.getTime() > date.getTime() ? max : date, new Date())
    };
};