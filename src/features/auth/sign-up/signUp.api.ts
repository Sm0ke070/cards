import {AxiosResponse} from 'axios';
import {instance} from "../sign-in/SingIn.api";


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