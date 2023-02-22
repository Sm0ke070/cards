import axios, {AxiosError} from 'axios';
import {AppThunkDispatch} from '../../../app/store';
import {setAppStatusAC, SetAppStatusActionType} from '../../../app/AppReducer';
import {authAPI, SignUpParamsType} from "../auth.api";


const initialState = {
    errorSignUp: null as null | string,
    isRegistered: false
}
type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType = initialState, action: SignUpActionsType): InitialStateType => {
    switch (action.type) {
        case 'signUp/SET-IS-ERROR-SIGN-UP':
            return {...state, errorSignUp: action.errorSignUp}
        case 'signUp/SET-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        default:
            return {...state}
    }
}


export const setErrorSignUpAC = (errorSignUp: string | null) =>
    ({type: 'signUp/SET-IS-ERROR-SIGN-UP', errorSignUp} as const)
export const setIsRegisteredAC = (isRegistered: boolean) =>
    ({type: 'signUp/SET-IS-REGISTERED', isRegistered} as const)


export const SignUpTC = (data: SignUpParamsType) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.register(data)
        console.log(res)
        if (res.statusText === 'Created') {
            setTimeout(() => {
                dispatch(setIsRegisteredAC(true))
            }, 4000)
            dispatch(setAppStatusAC('succeeded'))

        } else {
            dispatch(setAppStatusAC('failed'))

        }
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setErrorSignUpAC(error))
        }

    }
}

export type SignUpActionsType =
    ReturnType<typeof setErrorSignUpAC>
    | ReturnType<typeof setIsRegisteredAC>
    | SetAppStatusActionType