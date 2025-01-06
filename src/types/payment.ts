export interface IPayment {
    _id?: string,
    title: string,
    value: number
}

export enum PayTypes {
    Cash = "Готівка",
    Card = 'Безнал',
}