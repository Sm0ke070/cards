import {AppThunkDispatch} from "../../app/store";
import {Dispatch} from "redux";

const initialState = {
    userName: ''
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/CHANGE_NAME': {
            return {...state, userName: action.userName}
        }
        default:
            return state
    }
}

export const changeUserNameTC = () => (dispatch: AppThunkDispatch) => {

    try {

    } catch (e) {

    }
}

export const ChangeName = (userName: string) => ({type: 'PROFILE/CHANGE_NAME', userName} as const)


type ActionsType =
    ReturnType<typeof ChangeName>



