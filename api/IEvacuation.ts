export enum EvacuationType {
    LAY = 'лежачи',
    SIT = 'сидячи'
}

export enum EvacuationClinic {
    MPP = 'МПП МедР',
    VMH = 'ВМГ лікарні',
    VH = 'ВГ',
    VMKC = 'ВМКЦ',
    CIVIL = 'Цив. заклад'
}

export interface IEvacuationClinic {
    order: number;
    clinic: EvacuationClinic;
}

export type EvacuationPriority = 'I' | 'II' | 'III';

export enum EvacuationTransport {
    SANITARY = 'сан-',
    TRUCK = 'груз-',
    CAR = 'авто',
    TRAIN = 'потягом',
    SHIP = 'кораблем',
    HELICOPTER = 'гелікоптером',
    PLANE = 'літаком'
}

export interface IEvacuation {
    type: EvacuationType;
    clinic: IEvacuationClinic[];
    priority: EvacuationPriority;
    transport: EvacuationTransport;
}
