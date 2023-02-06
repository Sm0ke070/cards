import {Dispatch} from 'redux';
import axios, {AxiosError} from 'axios';
import {signUpAPI, SignUpParamsType} from './signUp.api';
import {ActionsType} from '../../../app/store';


const initialState = {
    errorSignUp: '',
    isRegistered:false
}

type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType = initialState, action: SignUpActionsType): InitialStateType => {
    switch (action.type) {
        case 'signUp/SET-IS-ERROR-SIGN-UP':
            return {...state, errorSignUp: action.errorSignUp}
        case 'signUp/SET-IS-REGISTERED':
            return {...state,isRegistered: action.isRegistered}
        default:
            return {...state}
    }
}


export const setErrorSignUpAC = (errorSignUp: string) =>
    ({type: 'signUp/SET-IS-ERROR-SIGN-UP', errorSignUp} as const)
export const setIsRegisteredAC = (isRegistered: boolean) =>
    ({type: 'signUp/SET-IS-REGISTERED', isRegistered} as const)



export const SignUpTC = (data: SignUpParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    console.log('data',data)
    try {
        const res = await signUpAPI.register(data)
        if (res) {
            dispatch(setIsRegisteredAC(true))
            res.data.error && dispatch(setErrorSignUpAC(res.data.error))
        } else {

        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            //dispatch(setAppErrorAC(error))
        } else {
            //dispatch(setAppErrorAC(`Native error ${err.message}`))
        }
    }
}

export type SignUpActionsType = ReturnType<typeof setErrorSignUpAC>|ReturnType<typeof setIsRegisteredAC>