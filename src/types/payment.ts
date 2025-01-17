export interface IPayment {
    _id?: string,
    title: string,
    value: number
}

export enum PayTypes {
    CASH = "Готівка",
    CARD = 'Безнал',
}

export interface IPaymentFromServer {
    _id: string,
    title: string,
    value: number
}
