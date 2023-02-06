import {Dispatch} from "redux";
import {passwordAPI, resetPasswordParamsType} from "../password.api";

const initialState = {}
type InitialStateType = typeof initialState

export const resetPasswordReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'RESET-PASSWORD': {
            return {...state}
        }
        default:
            return state
    }
}

export const resetPasswordAC = () => {
    return {type: 'RESET-PASSWORD'} as const
}

export const resetPasswordTC = (data: resetPasswordParamsType) => async (dispatch: Dispatch<resetPasswordActionsType>) => {
    console.log('data', data)

    const res = await passwordAPI.resetPassword(data)
    try {

    } catch (e) {

    }
}

export type resetPasswordActionsType = ReturnType<typeof resetPasswordAC>