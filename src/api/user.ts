import { IAuth, IUser } from "../types/user";
import axios from './axios';
// import {setCookie} from 'typescript-cookie';
import { toast } from 'react-toastify';
import {AxiosResponse} from "axios";


export const logIn = async (data: IAuth) => {
    try {

        const response: AxiosResponse = await axios.post('/auth/login', data)
        const user: IUser = response.data.user;
        const token: string = response.data.token;
        toast.success('Authorization Success!!!');
        window.localStorage.setItem("auth-token", token)
        // setCookie("auth-token", token, {path: '/', domain: 'http://localhost:3000'});
        return user;

    } catch(error) {
        toast.error('Невірний логін або пароль');
        console.log(error);
    }
}

export const getMe = async () => {

    try {
        const response: AxiosResponse = await axios.get('/auth/me')
        const user: IUser = response.data.user
        return user;
    } catch(error) {
        console.log(error);
    }
}

export const forgotPassword = async (data: {email: string}) => {
    try {
        const response: AxiosResponse = await axios.post('/auth/forgot-password', data);
        if (response.status === 200) {
            toast.success('Для відновлення пароля перейдіть на єлектронну пошту')
            return true;
        }
    } catch(error) {
        toast.error('Помилка при відновленні паролz');
        console.log(error);
    }
}

export const resetPassword = async (id: string, data: {password: string}, token: string) => {

    try {
        const response: AxiosResponse = await axios.patch(`/auth/reset-password/${id}?token=${token}`, data);

        if(response.status === 200) {
            toast.success('Пароль успішно змінено');
            return true;
        } else {
            throw new Error('Не вдалоя змінити пароль');
        }
        
    } catch(error) {
        toast.error('Не вдалоя змінити пароль');
        console.log(error);
    }
}

    export const updateUser = async (user: IUser) => {
        console.log(user._id)
        try {
            const response: AxiosResponse = await axios.patch(`/auth/update/${user._id}`, user)

            if (response.status === 200) {
                toast.success('Дані оновлено');
                return response.data;
            }
        } catch(error) {
            toast.error('Не вдалоя оновити дані');
            console.log(error);
        }
    }
