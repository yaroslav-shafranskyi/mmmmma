export enum ArmyRank {
    RECRUITE = 'рекрут',
    SOLDIER = 'солдат',
    SENIOR_SOLDIER = 'ст. солдат',

    JUNIOR_SERGEANT = 'мол. сержант',
    SERGEANT = 'сержант',

    SENIOR_SERGEANT = 'ст. сержант',
    MAIN_SERGEANT = 'гол. сержант',
    STAFF_SERGEANT = 'штаб-сержант',

    MASTER_SERGEANT = 'м. с-нт',
    SENIOR_MASTER_SERGEANT = 'ст. м.-сержант',
    PRIMARY_MASTER_SERGEANT = 'гол. м.-сержант',

    JUNIOR_LIEUTENANT = 'мол. л-нт.', 
    LIEUTENANT = 'лейтенант',
    SENIOR_LIEUTENANT = 'ст. л-нт.', 
    CAPTAIN = 'капітан',

    MAJOR = 'майор',
    LIEUTENANT_COLONEL = 'підполковник',
    COLONEL = 'полковник',

    BRIGADIER_GENERAL = 'бригадний генерал',
    GENERAL_MAJOR = 'генерал-майор',
    GENERAL_LIEUTENANT = 'генерал-лейтенант',
    GENERAL = 'генерал'
}

export enum ShipRank {
    RECRUITE = 'Рекрут',
    
    SAILOR = 'Матрос',
    SENIOR_SAILOR = 'Старший матрос',
    
    SECOND_PETTY = 'Старшина 2 статті',
    FIRST_PETTY = 'Старшина 1 статті',

    MAIN_PETTY = 'Головний старшина',
    MAIN_SHIP_PETTY = 'Головний корабельний старшина',
    STAFF_PETTY = 'Штаб-старшина',

    MASTER_PETTY = 'Майстер-старшина',
    SENIOR_MASTER_PETTY = 'Старший майстер-старшина',
    PRIMARY_MASTER_PETTY = 'Головний майстер-старшина',

    JUNIOR_LIEUTENANT = 'Молодший лейтенант', 
    LIEUTENANT = 'Лейтенант',
    SENIOR_LIEUTENANT = 'Старший лейтенант', 
    LIEUTENANT_CAPTAIN = 'Капітан-лейтенант',

    THIRD_RANK_CAPTAIN = 'Капітан 3 рангу',
    SECOND_RANK_CAPTAIN = 'Капітан 2 рангу',
    FIRST_RANK_CAPTAIN = 'Капітан 1 рангу',
    
    COMMODORE = 'Коммодор',
    REAR_ADMIRAL = 'Контрадмірал',
    VICE_ADMIRAL = 'Віцеадмірал',
    ADMIRAL = 'Адмірал'
}

export type Rank = ArmyRank | ShipRank;
