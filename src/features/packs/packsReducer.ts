import {AppRootStateType, AppThunkDispatch} from '../../app/store';
import {packsAPI, PackType} from './PacksAPI';
import {setAppStatusAC} from '../../app/AppReducer';


const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
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

        default:
            return state
    }
}
//Actions
const setPacks = (packs: SetPacksPropsType) => ({type: 'PACKS/SET_PACKS', payload: packs} as const)


// Thunks
export const getPacksTC = (filter?: string) => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    const {packName, sortPacks, max, min, page, pageCount} = getState().packsSettings.queryParams
    const user_id = filter === 'MY' ? getState().auth.userData._id : ''
    //const user_id =
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


// Types

type SetPacksPropsType =
    {
        cardPacks: PackType[]
        cardPacksTotalCount: number
        minCardsCount: number
        maxCardsCount: number
    }
export type setPacksType = ReturnType<typeof setPacks>


export type PacksReducerActionsType = setPacksType
