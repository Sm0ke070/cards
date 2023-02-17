import {ResponseUserDataType} from '../auth/auth.api';
import {ActionsType, AppRootStateType, AppThunk, AppThunkDispatch} from '../../app/store';
import {Dispatch} from 'redux';
import {PacksAPI, PackType} from './Packs.api';
import {sortingPacksMethods} from '../../constants/sortingMethods';


const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
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
        case 'PACKS/SET_PACKS':
            return {
                ...state,
                cardPacks: action.payload.cardPacks,
                cardPacksTotalCount: action.payload.cardPacksTotalCount,
                minCardsCount: action.payload.minCardsCount,
                maxCardsCount: action.payload.maxCardsCount
            }

        case 'PACKS/SET_PACKS_PAGE':
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    page: action.payload.Page
                }
            }

        case 'PACKS/SET_PAGE_COUNT':
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    pageCount: action.payload.PageCount
                }
            }

        case 'PACKS/SET_PACK_NAME':
            return {
                ...state, queryParams: {
                    ...state.queryParams, packName: action.payload.packName
                }
            }

        case 'PACKS/SET_CARD_COUNT':
            return {
                ...state, queryParams: {
                    ...state.queryParams, min: action.payload.CardCount[0]
                    , max: action.payload.CardCount[1]
                }
            }

        default:
            return state
    }
}

const setPacks = (packs: setPacksPropsType) => ({type: 'PACKS/SET_PACKS', payload: packs} as const)
export const setPacksPageAC = (Page: number) => ({type: 'PACKS/SET_PACKS_PAGE', payload: {Page}} as const)
export const setPageCountAC = (PageCount: number) => ({type: 'PACKS/SET_PAGE_COUNT', payload: {PageCount}} as const)
export const setPackName = (packName: string) => ({type: 'PACKS/SET_PACK_NAME', payload: {packName}} as const)

export const setCardCount = (CardCount: [number, number]) => {
    return {
        type: 'PACKS/SET_CARD_COUNT',
        payload: {CardCount}
    } as const
}


export const getPacks = (filter?: string) => async (dispatch: Dispatch, getState: any) => {
    const {packName, sortPacks, max, min, page, pageCount} = getState().packs.queryParams
    console.log('max, min', max, min)
    const user_id = filter === 'MY' ? getState().auth.userData._id : ''
    try {
        const res = await PacksAPI.getPacks({packName, sortPacks, max, min, page, pageCount, user_id})
        const {cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount} = res.data
        dispatch(setPacks({cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount}))
    } catch (e) {

    }
}

export const addNewPacks = (newPack: newPackType): AppThunk => async (dispatch: AppThunkDispatch) => {


    try {
        const res = await PacksAPI.addPacks(newPack)
        dispatch(getPacks('MY'))
    } catch (e) {

    }
}

export type newPackType = {
    cardsPack: {
        name: string,
        private: boolean
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
export type setPackNameType = ReturnType<typeof setPackName>
export type setMinCardCountType = ReturnType<typeof setCardCount>
// export type setMaxCardCountType = ReturnType<typeof setCardCount>


export type packsReducerActionsType = setPacksType
    | setPacksPageACType
    | setPageCountACType
    | setPackNameType
    | setMinCardCountType
// | setMaxCardCountType
