import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./AppReducer";
import {AuthActionsType, singInReducer} from "../features/auth/sign-in/SingInReducer";
import {SignUpActionsType, signUpReducer} from "../features/auth/sign-up/SignUpReducer";
import {
    resetPasswordActionsType,
    resetPasswordReducer
} from "../features/password/forgot-password/ResetPasswordReducer";
import {newPasswordReducer} from "../features/password/new-password/NewPasswordReducer";
import {profileReducer} from "../features/profile/ProfileReducer";
import {PacksListReduser} from "../features/packs-lists/PacksListReduser";

const rootReducer = combineReducers({
    app: appReducer,
    auth: singInReducer,
    profile: profileReducer,
    registration: signUpReducer,
    resPassword: resetPasswordReducer,
    newPassword: newPasswordReducer,
    packs: PacksListReduser
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type ActionsType = AuthActionsType | SignUpActionsType | resetPasswordActionsType

// @ts-ignore
window.store = store