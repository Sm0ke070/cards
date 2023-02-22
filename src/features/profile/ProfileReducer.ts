import {AppThunkDispatch} from "../../app/store";
import {profileAPI} from "./Profile.api";
import {authAPI} from "../auth/auth.api";
import {setUserAC} from "../auth/sign-in/SingInReducer";

const initialState = {
    userName: 'user name',
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

    try {
        await profileAPI.changeName(name)
        const res = await authAPI.me()
        dispatch(setUserAC(res.data))
    } catch (e) {

    }
}

type ActionsType = ReturnType<typeof changeNameAC>




