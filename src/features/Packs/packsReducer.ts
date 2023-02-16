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
        page: 1,
        min: 0,
        max: 110,
        packName: '',
        sortPacks: sortingPacksMethods.desUpdate,
    },
}
type InitialStateType = typeof initialState

export const packsReducer = (state: InitialStateType = initialState, action: packsReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS': {
            return {
                ...state,
                cardPacks: action.payload.cardPacks,
                cardPacksTotalCount: action.payload.cardPacksTotalCount,
                minCardsCount: action.payload.minCardsCount,
                maxCardsCount: action.payload.maxCardsCount
            }
        }
        case 'PACKS/SET_PACKS_PAGE':{
            return {...state,queryParams: {...state.queryParams,
                page: action.payload.value
                }}
        }
        case 'PACKS/SET_PAGE_COUNT':{
            return {...state,queryParams: {...state.queryParams,
                    pageCount: action.payload.value
                }}
        }

        default:
            return state
    }
}

const setPacks = (packs: setPacksPropsType) => ({type: 'PACKS/SET_PACKS', payload: packs} as const)
export const setPacksPageAC = (value: number) => ({ type: 'PACKS/SET_PACKS_PAGE', payload: {value} } as const)
export const setPageCountAC = (value: number) => ({ type: 'PACKS/SET_PAGE_COUNT', payload: {value} } as const)


export const getPacks = (filter?: string) => async (dispatch: Dispatch, getState: any) => {
    const {packName, sortPacks, max, min, page, pageCount} = getState().packs.queryParams

    const user_id = filter === 'MY' ? getState().auth.userData._id : ''
    try {
        const res = await PacksAPI.getPacks({packName, sortPacks, max, min, page, pageCount, user_id})
        const {cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount} = res.data
        dispatch(setPacks({cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount}))
    } catch (e) {

    }
}


type setPacksPropsType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}
export type setPacksType = ReturnType<typeof setPacks>
export type setPacksPageACType = ReturnType<typeof setPacksPageAC>
export type setPageCountACType = ReturnType<typeof setPageCountAC>


export type packsReducerActionsType = setPacksType|setPacksPageACType|setPageCountACType
