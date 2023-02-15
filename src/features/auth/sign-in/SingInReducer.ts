import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {ActionsType} from '../../../app/store';
import {authAPI, LoginParamsType, ResponseUserDataType} from "../auth.api";
import {changeNameAC} from "../../profile/ProfileReducer";

const initialState = {
    isLoggedIn: false,
    errorSignIn: '',
    userData: {} as ResponseUserDataType
}
type InitialStateType = typeof initialState

export const singInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'signIn/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }

        case 'signIn/SET-USER': {
            return {...state, userData: {...action.payload}}
        }
        case 'signIn/SET-IS-ERROR-SIGN-IN': {
            return {...state, errorSignIn: action.errorSignIn}
        }
        default:
            return state
    }
}
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'signIn/SET-IS-LOGGED-IN', value} as const)
export const setUserAC = (data: ResponseUserDataType) =>
    ({type: 'signIn/SET-USER', payload: {...data}} as const)
export const setErrorSignInAC = (errorSignIn: string) =>
    ({type: 'signIn/SET-IS-ERROR-SIGN-IN', errorSignIn} as const)

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        const res = await authAPI.login(data)
        if (res.statusText === 'OK') {
            dispatch(setUserAC(res.data))
            dispatch(setIsLoggedInAC(true))
            console.log(res.data)
        } else {

        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            console.log(error)
            dispatch(setErrorSignInAC(error))
            //dispatch(setAppErrorAC(error))
        } else {
            //dispatch(setAppErrorAC(`Native error ${err.message}`))
        }
    }
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    //dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res) {
                dispatch(setIsLoggedInAC(false))
                //dispatch(setAppStatusAC('succeeded'))
            } else {
                //handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            //handleServerNetworkError(error, dispatch)
        })
}

export type AuthActionsType =
    ReturnType<typeof setUserAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setErrorSignInAC>
    | ReturnType<typeof changeNameAC>