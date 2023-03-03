import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
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
import {packsReducer, PacksReducerActionsType} from '../features/packs/packsReducer';
import {cardsReducer} from "../features/cards/cardsReducer";
import {learnReducer} from "../features/cards/learn/learn-reducer";
import {packsSettingsReducer} from '../features/packs/packsSettingsReducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: singInReducer,
    profile: profileReducer,
    registration: signUpReducer,
    resPassword: resetPasswordReducer,
    newPassword: newPasswordReducer,
    packs: packsReducer,
    packsSettings:packsSettingsReducer,
    cards: cardsReducer,
    learn:learnReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>

export type ActionsType =
    AuthActionsType
    | SignUpActionsType
    | resetPasswordActionsType
    | PacksReducerActionsType

// @ts-ignore
window.store = store