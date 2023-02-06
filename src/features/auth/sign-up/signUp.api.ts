import {instance} from '../sign-in/login.api';
import {AxiosResponse} from 'axios';


export const signUpAPI = {
    register: (data: SignUpParamsType) => {
        return instance.post<SignUpParamsType, AxiosResponse<RegisterResponseType>>('auth/register', data)
    }

}
export type SignUpParamsType = {
    email: string
    password: string
}
export type RegisterResponseType = {
    addedUser: {}
    error?: string;
}