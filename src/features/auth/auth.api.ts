import {AxiosResponse} from 'axios';
import {instance} from "../../app/base-url";


export const authAPI = {
    register: (data: SignUpParamsType) => {
        return instance.post<SignUpParamsType, AxiosResponse<RegisterResponseType>>('auth/register', data)
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseUserDataType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<ResponseUserDataType>('auth/me')
    },
    me() {
        return instance.post<ResponseUserDataType>('auth/me');
    },
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResponseUserDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type SignUpParamsType = {
    email: string
    password: string
}
export type RegisterResponseType = {
    addedUser: AddedUser
    error?: string;
}
export type AddedUser = {
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    _id: string;
    created: string;
    updated: string;
    __v: number;
}

