import { IAuth } from "../types/user";
import axios from './axios';
import {setCookie} from 'typescript-cookie';
import { toast } from 'react-toastify';

export const logIn = async (data: IAuth) => {
    try {
        const response = await axios.post('/auth/login', data)
        toast.success('Authorization Success!!!');
        setCookie("auth-token", response.data.token, { expires: 1 });
        return response.data;
    } catch(error) {
        toast.error('Невірний логін або пароль');
        console.log(error);
    }
}

export const getMe = async () => {
    try {
        const response = await axios.get('/auth/me')
        return response.data.user;
    } catch(error) {
        console.log(error);
    }
} 