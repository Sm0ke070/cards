import {AppThunkDispatch} from "../../app/store";
import {profileAPI} from "./Profile.api";
import {authAPI} from "../auth/auth.api";
import {setUserAC} from "../auth/sign-in/SingInReducer";
import {Dispatch} from "redux";

const initialState = {
    userName: 'user name',
    avatar:''
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/CHANGE_NAME": {
            return {...state, userName: action.userName}
        }
      /*  case "CHANGE_AVA":{
            return {...state,avatar:action.ava}
        }*/
        default:
            return state
    }
}
export const changeNameAC = (userName: string) => ({type: 'PROFILE/CHANGE_NAME', userName} as const)
//const changeAvaAC=(ava:any)=>({type:'CHANGE_AVA',ava} as const)


export const changeUserNameTC = (name: string) => async (dispatch: AppThunkDispatch) => {

    try {
        await profileAPI.changeName(name)
        const res = await authAPI.me()
        dispatch(setUserAC(res.data))
    } catch (e) {

    }
}

export const changeAvaAC=(ava:string)=>async (dispatch:Dispatch)=>{
    try{
        await profileAPI.changeAva(ava)
        const res=await authAPI.me()
       // dispatch(changeAvaAC(res.data))
    }catch (e) {

    }
}

type ActionsType = ReturnType<typeof changeNameAC>
    //|ReturnType<typeof changeAvaAC>




