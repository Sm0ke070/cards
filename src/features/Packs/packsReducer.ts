import {ResponseUserDataType} from '../auth/auth.api';
import {ActionsType, AppRootStateType} from '../../app/store';
import {Dispatch} from 'redux';
import {PacksAPI, PackType} from './Packs.api';
import {sortingPacksMethods} from '../../constants/sortingMethods';


const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    resetRange: false,
    queryParams: {
        pageCount: 5,
        page:1,
        min: 0,
        max: 110,
        user_id: '',
        packName: '',
        sortPacks: sortingPacksMethods.desUpdate,
    },
}
type InitialStateType = typeof initialState

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS': {
            return {...state,
                cardPacks:action.payload.cardPacks,
                cardPacksTotalCount:action.payload.cardPacksTotalCount,
                minCardsCount: action.payload.minCardsCount,
                maxCardsCount: action.payload.maxCardsCount
            }
        }


        default:
            return state
    }
}

const setPacks = (packs:{
    cardPacks: PackType[]
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
})=>({type:'SET_PACKS',payload:packs})
export type setPacksType = ReturnType<typeof setPacks>

export const getPacks = ()=> async (dispatch:Dispatch,getState:any)=>{
    const { packName, sortPacks, max, min, page, pageCount, user_id } = getState().packs.queryParams

    try {
        const res = await PacksAPI.getPacks({packName, sortPacks, max, min, page, pageCount, user_id})
        const { cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount } = res.data
        dispatch(setPacks({cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount}))
    }
    catch (e){

    }
}