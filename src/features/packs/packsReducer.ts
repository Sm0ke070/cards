import {AppRootStateType, AppThunk, AppThunkDispatch} from '../../app/store';
import {packsAPI, PackType} from './PacksAPI';
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

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionsType): InitialStateType => {
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
                    page: action.payload.page
                }
            }
        case 'PACKS/SET_PAGE_COUNT':
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    pageCount: action.payload.pageCount
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
                    ...state.queryParams, min: action.payload.cardCount[0]
                    , max: action.payload.cardCount[1]
                }
            }
        case 'PACKS/SET_RESET_FILTER':
            return {
                ...state, resetFilter: action.payload.resetFilter
            }
        case  'PACKS/SET_SORT_METHOD':
            return {
                ...state, queryParams: {...state.queryParams, sortPacks: action.payload.sortMethod}
            }
        default:
            return state
    }
}
//Actions
const setPacks = (packs: SetPacksPropsType) => ({type: 'PACKS/SET_PACKS', payload: packs} as const)
export const setPacksPageAC = (page: number) => ({type: 'PACKS/SET_PACKS_PAGE', payload: {page}} as const)
export const setPageCountAC = (pageCount: number) => ({type: 'PACKS/SET_PAGE_COUNT', payload: {pageCount}} as const)
export const setPackNameAC = (packName: string) => ({type: 'PACKS/SET_PACK_NAME', payload: {packName}} as const)
export const setResetFilterAC = (resetFilter: boolean) => ({
    type: 'PACKS/SET_RESET_FILTER',
    payload: {resetFilter}
} as const)
export const setSortPacksMethodAC = (sortMethod: sortingPacksMethods) => ({
    type: 'PACKS/SET_SORT_METHOD',
    payload: {sortMethod}
} as const)

export const setCardCountAC = (cardCount: [number, number]) => {
    return {
        type: 'PACKS/SET_CARD_COUNT',
        payload: {cardCount}
    } as const
}


// Thunks
export const getPacksTC = (filter?: string) => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    const {packName, sortPacks, max, min, page, pageCount} = getState().packs.queryParams
    const user_id = filter === 'MY' ? getState().auth.userData._id : ''
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await packsAPI.getPacks({packName, sortPacks, max, min, page, pageCount, user_id})
        const {cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount} = res.data
        dispatch(setPacks({cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут

    }

}

export const addNewPacksTC = (newPack: NewPackType): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsAPI.addPack(newPack)
        dispatch(getPacksTC('MY'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}

export const deletePackTC = (idPack: string): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsAPI.deletePack(idPack)
        dispatch(getPacksTC('MY'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}

export const updatePackTC = (updatePackData: UpdatePackType): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsAPI.updatePack(updatePackData)
        dispatch(getPacksTC('MY'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}

// Types
export type NewPackType = {
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
type SetPacksPropsType =
    {
        cardPacks: PackType[]
        cardPacksTotalCount: number
        minCardsCount: number
        maxCardsCount: number
    }
export type setPacksType = ReturnType<typeof setPacks>
export type setPacksPageACType = ReturnType<typeof setPacksPageAC>
export type setPageCountACType = ReturnType<typeof setPageCountAC>
export type setPackNameType = ReturnType<typeof setPackNameAC>
export type setMinCardCountType = ReturnType<typeof setCardCountAC>
export type setResetFilterType = ReturnType<typeof setResetFilterAC>
export type setSortMethodType = ReturnType<typeof setSortPacksMethodAC>


export type PacksReducerActionsType = setPacksType
    | setPacksPageACType
    | setPageCountACType
    | setPackNameType
    | setMinCardCountType
    | setResetFilterType
    | setSortMethodType
