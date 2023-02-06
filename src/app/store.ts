import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {AuthActionsType, singInReducer} from "../features/auth/sign-in/SingIn-reducer";
import {SignUpActionsType, signUpReducer} from "../features/auth/sign-up/signUp-reducer";
import {
    resetPasswordActionsType,
    resetPasswordReducer
} from "../features/password/forgot-password/reset-password-reducer";
import {newPasswordReducer} from "../features/password/new-password/new-password-reducer";
import {profileReducer} from "../features/profile/profile-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: singInReducer,
    profile: profileReducer,
    registration: signUpReducer,
    resPassword: resetPasswordReducer,
    newPassword: newPasswordReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type ActionsType = AuthActionsType | SignUpActionsType | resetPasswordActionsType

// @ts-ignore
window.store = store