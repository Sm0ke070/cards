import {setIsLoggedInAC, setUserAC} from "../features/auth/sign-in/SingInReducer";
import {Dispatch} from "redux";
import {authAPI} from "../features/auth/auth.api";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedStatusAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

export const meTC = () => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res) {
            dispatch(setUserAC(res.data))
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
            //console.log(res)
        } else {
            //handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (err) {
        // @ts-ignore
        //handleServerNetworkError(err, dispatch)
        dispatch(setAppStatusAC('failed'))

    } finally {
        dispatch(setIsInitializedStatusAC(true))
    }
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedStatusAC>
    | ReturnType<typeof setUserAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
