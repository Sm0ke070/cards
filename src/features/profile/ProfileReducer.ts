import {AppThunkDispatch} from "../../app/store";
import {profileAPI} from "./Profile.api";
import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";

const initialState = {
    userName: ''
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/CHANGE_NAME": {
            return {...state, userName: action.userName}
        }
        default:
            return state
    }
}
export const changeNameAC = (userName: string) => ({type: 'PROFILE/CHANGE_NAME', userName} as const)


export const changeUserNameTC = (name: string) => async (dispatch: AppThunkDispatch) => {

        await profileAPI.changeName(name)
        dispatch(changeNameAC(name))
}


type ActionsType =
    ReturnType<typeof changeNameAC>



