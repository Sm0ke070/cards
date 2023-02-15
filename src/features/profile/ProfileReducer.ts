import {AppThunkDispatch} from "../../app/store";
import {profileAPI} from "./Profile.api";
import {authAPI} from "../auth/auth.api";

const initialState = {
    userName: ''
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/CHANGE_NAME": {
            return {...state, userName: action.userName}
        }
        case "PROFILE/SET_NAME": {
            return {...state, userName: action.userName}
        }
        default:
            return state
    }
}
export const changeNameAC = (userName: string) => ({type: 'PROFILE/CHANGE_NAME', userName} as const)
export const setNameAC = (userName: string) => ({type: 'PROFILE/SET_NAME', userName} as const)


export const changeUserNameTC = (name: string) => async (dispatch: AppThunkDispatch) => {

    await profileAPI.changeName(name)
    dispatch(changeNameAC(name))

}
export const getUserNameTC = () => async (dispatch: AppThunkDispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(setNameAC(res.data.name))
    } catch (e) {

    }
}


type ActionsType =
    ReturnType<typeof changeNameAC>
    | ReturnType<typeof setNameAC>



