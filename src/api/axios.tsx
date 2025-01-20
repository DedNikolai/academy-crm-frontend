import axios from "axios";
import {getCookie} from 'typescript-cookie';
import {app} from '../constants/app';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || app.SERVER_URL,
});

instance.interceptors.request.use(
    config => {
        // const authToken = getCookie("auth-token");
        const authToken = window.localStorage.getItem("auth-token")
        if (authToken) {
            config.headers.authorization = `Bearer ${authToken}`;
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },

    error => Promise.reject(error)
)

export default instance;