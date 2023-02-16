import {CarsPacksResponce, PacksListAPI} from "./PacksList.api";
import {Dispatch} from "redux";

const initialState: CarsPacksResponce = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 4

}


type ItnitialStateType = typeof initialState

export const PacksListReduser = (state: ItnitialStateType = initialState, action: ActionType): ItnitialStateType => {
    switch (action.type) {
        case "GET_ALL_PACKSLIST": {
            return {...state, ...action.allPacksList}
        }
        case "GET_MY_PACKSLIST":{
            return {...state, ...action.myPacksList}
        }

        default:
            return state
    }
}

export const getAllPacksList = (allPacksList: CarsPacksResponce) => ({type: "GET_ALL_PACKSLIST", allPacksList} as const)
export const getMyPacksList = (myPacksList: CarsPacksResponce) => ({
    type: "GET_MY_PACKSLIST",
    myPacksList
} as const)


type ActionType = ReturnType<typeof getAllPacksList> |
    ReturnType<typeof getMyPacksList>

export const getAllPacksListTC = () => async (dispatch: Dispatch) => {
    const res = await PacksListAPI.getAllPacksList()
    dispatch(getAllPacksList(res.data))
}

export const getMyPacksListTC=(user_id:string)=>async (dispatch:Dispatch)=>{
    const res = await  PacksListAPI.getMyPacksList(user_id)
    dispatch(getMyPacksList(res.data))
}
