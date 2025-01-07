export interface IPayment {
    _id?: string,
    title: string,
    value: number
}

export const PayTypes = {
    'Cash': "Готівка",
    'Card': 'Безнал',
}