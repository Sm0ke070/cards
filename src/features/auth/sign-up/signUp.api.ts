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

