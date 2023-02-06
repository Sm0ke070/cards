import {Dispatch} from "redux";

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

export const resetPassword = () => {
    return {type: 'RESET-PASSWORD'} as const
}

export const resetPasswordTC = () => async (dispatch: Dispatch<ActionsType>) => {

}

type ActionsType = ReturnType<typeof resetPassword>