export interface ITreatments {
    antibiotic?: string;
    serum?: string;
    toxoid?: string;
    antidote?: string;
    painReliever?: string;
}

export interface IMedicalOperations {
    bloodTransfusion?: boolean;
    bloodSubstitute?: boolean;
    immobilization?: boolean;
    dressing?: boolean;
    bandage?: boolean;
    sanitary?: boolean;
    additionalInfo?: string;
}

export interface IMedicalHelp {
    treatments?: ITreatments;
    operations?: IMedicalOperations;
}
