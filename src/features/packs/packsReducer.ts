import {ResponseUserDataType} from '../auth/auth.api';
import {ActionsType, AppRootStateType, AppThunk, AppThunkDispatch} from '../../app/store';
import {Dispatch} from 'redux';
import {PacksAPI, PackType} from './Packs.api';
import {sortingPacksMethods} from '../../constants/sortingMethods';
import {setAppStatusAC} from '../../app/AppReducer';


const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    resetFilter: false,
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

        case 'PACKS/SET_RESET_FILTER':
            return {
                ...state, resetFilter: action.payload.ResetFilter
            }

        case  'PACKS/SET_SORT_METHOD':
            return {
                ...state, queryParams: {...state.queryParams, sortPacks: action.payload.SortMethod}
            }

        default:
            return state
    }
}
//Actions
const setPacks = (packs: setPacksPropsType) => ({type: 'PACKS/SET_PACKS', payload: packs} as const)
export const setPacksPageAC = (Page: number) => ({type: 'PACKS/SET_PACKS_PAGE', payload: {Page}} as const)
export const setPageCountAC = (PageCount: number) => ({type: 'PACKS/SET_PAGE_COUNT', payload: {PageCount}} as const)
export const setPackName = (packName: string) => ({type: 'PACKS/SET_PACK_NAME', payload: {packName}} as const)
export const setResetFilter = (ResetFilter: boolean) => ({
    type: 'PACKS/SET_RESET_FILTER',
    payload: {ResetFilter}
} as const)
export const setSortPacksMethod = (SortMethod: sortingPacksMethods) => ({
    type: 'PACKS/SET_SORT_METHOD',
    payload: {SortMethod}
} as const)

export const setCardCount = (CardCount: [number, number]) => {
    return {
        type: 'PACKS/SET_CARD_COUNT',
        payload: {CardCount}
    } as const
}


// Thunks
export const getPacks = (filter?: string) => async (dispatch: Dispatch, getState: any) => {
    const {packName, sortPacks, max, min, page, pageCount} = getState().packs.queryParams
    const user_id = filter === 'MY' ? getState().auth.userData._id : ''
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await PacksAPI.getPacks({packName, sortPacks, max, min, page, pageCount, user_id})
        const {cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount} = res.data
        dispatch(setPacks({cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут

    }

}

export const addNewPacks = (newPack: newPackType): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await PacksAPI.addPack(newPack)
        dispatch(getPacks('MY'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}

export const deletePack = (idPack: string): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await PacksAPI.deletePack(idPack)
        dispatch(getPacks('MY'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}

export const updatePack = (updatePackData: UpdatePackType): AppThunk => async (dispatch: AppThunkDispatch) => {
    debugger
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await PacksAPI.updatePack(updatePackData)
        dispatch(getPacks('MY'))
        dispatch(setAppStatusAC('succeeded'))
        debugger
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}

// Types
export type newPackType = {
    cardsPack: {
        name: string,
        private: boolean
    }
}
export type UpdatePackType = {
    cardsPack: {
        _id: string
        name: string,
    }
}
type setPacksPropsType =
    {
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
export type setResetFilterType = ReturnType<typeof setResetFilter>
export type setSortMethodType = ReturnType<typeof setSortPacksMethod>


export type packsReducerActionsType = setPacksType
    | setPacksPageACType
    | setPageCountACType
    | setPackNameType
    | setMinCardCountType
    | setResetFilterType
    | setSortMethodType
