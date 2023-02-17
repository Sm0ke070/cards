import {CardsPackType, CarsPacksResponce, PacksListAPI} from "./PacksList.api";
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
        case "GET_MY_PACKSLIST": {
            return {...state, ...action.myPacksList}
        }
        case "NEW_MY_PACK_LIST": {
            return {...state, cardPacks: [action.cardsPack,...state.cardPacks]}
        }

        default:
            return state
    }
}

export const getAllPacksList = (allPacksList: CarsPacksResponce) => ({type: "GET_ALL_PACKSLIST", allPacksList} as const)
export const getMyPacksList = (myPacksList: CarsPacksResponce) => ({type: "GET_MY_PACKSLIST", myPacksList} as const)
export const newMyPackList = (cardsPack: CardsPackType) => ({type: "NEW_MY_PACK_LIST", cardsPack } as const)


type ActionType = ReturnType<typeof getAllPacksList> |
    ReturnType<typeof getMyPacksList> |
    ReturnType<typeof newMyPackList>

export const getAllPacksListTC = () => async (dispatch: Dispatch) => {
    const res = await PacksListAPI.getAllPacksList()
    dispatch(getAllPacksList(res.data))
}

export const getMyPacksListTC = (user_id: string) => async (dispatch: Dispatch) => {
    const res = await PacksListAPI.getMyPacksList(user_id)
    console.log(res)
    dispatch(getMyPacksList(res.data))
}
export const createNewMyCardPack = (name: string) => async (dispatch: Dispatch) => {
    const res = await PacksListAPI.newMyPack(name)
    dispatch(newMyPackList(res.data.newCardsPack))
}
