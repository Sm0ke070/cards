import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/auth/sign-in/auth-reducer";
import {registrationReducer} from "../features/auth/sign-up/registration-reducer";
import {resetPasswordReducer} from "../features/password/forgot-password/reset-password-reducer";
import {newPasswordReducer} from "../features/password/new-password/new-password-reducer";
import {profileReducer} from "../features/profile/profile-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    registration: registrationReducer,
    resPassword: resetPasswordReducer,
    newPassword: newPasswordReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store