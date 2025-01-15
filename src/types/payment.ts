export interface IPayment {
    _id?: string,
    title: string,
    value: number
}

export const PayTypes = {
    'cash': "Готівка",
    'card': 'Безнал',
}