import {Dispatch} from "redux";
import {passwordAPI, resetPasswordParamsType} from "../password.api";

const initialState = {
    sandRequest: false,

}
type InitialStateType = typeof initialState

export const resetPasswordReducer = (state: InitialStateType = initialState, action: resetPasswordActionsType): InitialStateType => {
    switch (action.type) {
        case 'RESET-PASSWORD': {
            return {...state, sandRequest: action.isSand}
        }
        case 'SET-NEW-PASSWORD': {
            return {...state}
        }
        default:
            return state
    }
}
export const resetPasswordAC = (isSand: boolean) => {
    return {type: 'RESET-PASSWORD', isSand} as const
}
export const setNewPasswordAC = () => {
    return {type: 'SET-NEW-PASSWORD'} as const
}

export const resetPasswordTC = (data: resetPasswordParamsType) => async (dispatch: Dispatch<resetPasswordActionsType>) => {
    console.log('data', data)
    try {
        const res = await passwordAPI.resetPassword(data)
        dispatch(resetPasswordAC(true))
    } catch (e) {

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


export type resetPasswordActionsType = ReturnType<typeof resetPasswordAC> | ReturnType<typeof setNewPasswordAC>