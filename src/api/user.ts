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


export const resetEmail = async (data: {email: string}) => {
    try {
        const response: AxiosResponse = await axios.post('/auth/reset-email', data);

        if (response.status === 200) {
            toast.success(response.data.message);
            return true;
        } else {
            toast.error(response.data.message);
            return false;
        }

    } catch(error) {
        console.log(error);
        toast.error('Неможливо оновити пошту')
    }
}

export const updateEmail = async (data: {email: string,  code?: string}) => {
    try {
        const response: AxiosResponse = await axios.post('/auth/update-email', data);

        if (response.status === 200) {
            toast.success('Пошту оновлено');
            return response.data;
        } else {
            toast.error(response.data.message);
            return false;
        }

    } catch(error) {
        console.log(error);
        toast.error('Неможливо оновити пошту')
    }
}
