import {Dispatch} from 'redux';
import axios, {AxiosError} from 'axios';
import {signUpAPI, SignUpParamsType} from './signUp.api';
import {ActionsType} from '../../../app/store';

type initialStateType = {
    errorSignUp: null | string
    isRegistered: boolean
}
const initialState = {
    errorSignUp: null,
    isRegistered: false
}


export const signUpReducer = (state: initialStateType = initialState, action: SignUpActionsType): initialStateType => {
    switch (action.type) {
        case 'signUp/SET-IS-ERROR-SIGN-UP':
            return {...state, errorSignUp: action.errorSignUp}
        case 'signUp/SET-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        default:
            return {...state}
    }
}


export const setErrorSignUpAC = (errorSignUp: string) =>
    ({type: 'signUp/SET-IS-ERROR-SIGN-UP', errorSignUp} as const)
export const setIsRegisteredAC = (isRegistered: boolean) =>
    ({type: 'signUp/SET-IS-REGISTERED', isRegistered} as const)


export const SignUpTC = (data: SignUpParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    console.log('data', data)
    try {
        const res = await signUpAPI.register(data)
        if (res) {
            dispatch(setIsRegisteredAC(true))
        } else {

        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setErrorSignUpAC(error))
        }
    }
}

export type SignUpActionsType = ReturnType<typeof setErrorSignUpAC> | ReturnType<typeof setIsRegisteredAC>