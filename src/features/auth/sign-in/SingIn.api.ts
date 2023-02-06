import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const SingInAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/me')
    },
    me() {
        return instance.post<ResponseType>('auth/me');
    },
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}