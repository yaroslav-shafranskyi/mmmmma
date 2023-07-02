export interface ICommonFormHeaderFields {
    department: string;
    clinic: string;
    code: string;
    order: {
        date: Date;
        number: string;
    };
}
