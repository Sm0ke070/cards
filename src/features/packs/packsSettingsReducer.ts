import {sortingPacksMethods} from '../../constants/sortingMethods';
import {AppThunk, AppThunkDispatch} from '../../app/store';
import {setAppStatusAC} from '../../app/AppReducer';
import {packsAPI} from './PacksAPI';
import {getPacksTC} from './packsReducer';


const initialState = {
    resetFilter: false,
    allOrMy: 'ALL',
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

export const packsSettingsReducer = (state: InitialStateType = initialState, action: PacksSettingsReducerActionsType): InitialStateType => {
    switch (action.type) {
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
            return {...state, resetFilter: action.payload.resetFilter}
        case  'PACKS/SET_SORT_METHOD':
            return {...state, queryParams: {...state.queryParams, sortPacks: action.payload.sortMethod}}
        case 'PACKS/SET_All_OR_MY':
            return {...state, allOrMy: action.payload.allOrMyAC}
        default:
            return state
    }
}
//Actions
export const setPacksPageAC = (page: number) => ({type: 'PACKS/SET_PACKS_PAGE', payload: {page}} as const)
export const setPageCountAC = (pageCount: number) => ({type: 'PACKS/SET_PAGE_COUNT', payload: {pageCount}} as const)
export const setPackNameAC = (packName: string) => ({type: 'PACKS/SET_PACK_NAME', payload: {packName}} as const)
export const setAllOrMyAC = (allOrMyAC: string) => ({type: 'PACKS/SET_All_OR_MY', payload: {allOrMyAC}} as const)
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
export const addNewPacksTC = (newPack: NewPackType): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsAPI.addPack(newPack)
        console.log(res.data)
        dispatch(getPacksTC('ALL'))
        dispatch(setAllOrMyAC('ALL'))

        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}

export const deletePackTC = (packId: string): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsAPI.deletePack(packId)
        dispatch(getPacksTC('ALL'))
        dispatch(setAllOrMyAC('ALL'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}

export const updatePackTC = (updatePackData: UpdatePackType): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsAPI.updatePack(updatePackData)
        dispatch(getPacksTC('ALL'))
        dispatch(setAllOrMyAC('ALL'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут
    }
}
// Types
export type NewPackType = {
    cardsPack: {
        name: string
        deckCover?: string
        private: boolean
    }
}
export type UpdatePackType = {
    cardsPack: {
        _id: string
        name: string,
    }
}


export type setPacksPageACType = ReturnType<typeof setPacksPageAC>
export type setPageCountACType = ReturnType<typeof setPageCountAC>
export type setPackNameType = ReturnType<typeof setPackNameAC>
export type setMinCardCountType = ReturnType<typeof setCardCountAC>
export type setResetFilterType = ReturnType<typeof setResetFilterAC>
export type setSortMethodType = ReturnType<typeof setSortPacksMethodAC>
export type setAllOrMyType = ReturnType<typeof setAllOrMyAC>


export type PacksSettingsReducerActionsType = setPacksPageACType
    | setPageCountACType
    | setPackNameType
    | setMinCardCountType
    | setResetFilterType
    | setSortMethodType
    | setAllOrMyType
