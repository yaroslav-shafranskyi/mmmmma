export type MonthName = 'січня' | 'лютого' | 'березня' | 'квітня' | 'травня' | 'червня' | 'липня' | 'серпня' | 'вересня' | 'жовтня' | 'листопада' | 'грудня';

export interface IDateData {
    hours: string;
    minutes: string;
    day: string;
    month: string;
    monthName?: MonthName;
    year: string;
}

export interface IExtendedDate extends Partial<IDateData> {
    date: Date;
}
