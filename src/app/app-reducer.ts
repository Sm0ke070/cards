import {setIsLoggedInAC} from "../features/auth/sign-in/SingIn-reducer";
import {Dispatch} from "redux";
import {SingInAPI} from "../features/auth/sign-in/SingIn.api";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await SingInAPI.me()
        if (res) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            //handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        console.log('not auth')
        // @ts-ignore
        //handleServerNetworkError(err, dispatch)

    } finally {
        dispatch(setIsInitializedStatusAC(true))
    }
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedStatusAC>
