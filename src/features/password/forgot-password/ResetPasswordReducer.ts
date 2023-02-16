import {Dispatch} from "redux";
import {passwordAPI, resetPasswordParamsType} from "../password.api";
import axios, {AxiosError} from "axios";

const initialState = {
    sandRequest: false,
    errorRequest: '',

}
type InitialStateType = typeof initialState

export const resetPasswordReducer = (state: InitialStateType = initialState, action: resetPasswordActionsType): InitialStateType => {
    switch (action.type) {
        case 'FORGOT/RESET-PASSWORD': {
            return {...state, sandRequest: action.isSand}
        }
        case 'FORGOT/SET-NEW-PASSWORD': {
            return {...state}
        }
        case 'FORGOT/SET-ERROR-FORGOT-PASS': {
            return {...state, errorRequest: action.error}
        }
        default:
            return state
    }
}
export const resetPasswordAC = (isSand: boolean) => {
    return {type: 'FORGOT/RESET-PASSWORD', isSand} as const
}
export const setNewPasswordAC = () => {
    return {type: 'FORGOT/SET-NEW-PASSWORD'} as const
}
export const setErrorPasswordAC = (error: string) => {
    return {type: 'FORGOT/SET-ERROR-FORGOT-PASS', error} as const
}

export const resetPasswordTC = (data: resetPasswordParamsType) => async (dispatch: Dispatch<resetPasswordActionsType>) => {
    console.log('data', data)
    try {
        await passwordAPI.resetPassword(data)
        dispatch(resetPasswordAC(true))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setErrorPasswordAC(error))
        }
    } finally {

    }
}
export const setNewPasswordTC = (pass: string, token: string) => async (dispatch: Dispatch) => {
    try {
        await passwordAPI.serNewPassword(pass, token)
        dispatch(setNewPasswordAC())
    } catch (e) {

    }

}


export type resetPasswordActionsType =
    ReturnType<typeof resetPasswordAC>
    | ReturnType<typeof setNewPasswordAC>
    | ReturnType<typeof setErrorPasswordAC>