export interface IExpense {
    _id?: string;
    payaccount: string,
    value: number,
    title: string,
    actions?: null,
    timestamp?: string
}

export interface IFormDataExpense {
    _id?: string;
    payaccount: string,
    value: number,
    title: string,
}