import {sortingCardsMethods} from '../../constants/sortingMethods';
import {Dispatch} from 'redux';
import {setAppStatusAC} from "../../app/AppReducer";
import {AppRootStateType, AppThunk, AppThunkDispatch} from "../../app/store";
import {cardAPI, ResponseType} from "./cardAPI";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: '',
    cardsPack_id: '',
    resetFilter: false,
    queryParams: {
        pageCount: 5,
        page: 1,
        cardName: '',
        sortCards: sortingCardsMethods.desUpdate
    },
}

type InitialStateType = typeof initialState
export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS_ID':
            return {
                ...state, cardsPack_id: action.payload.currentCardsPackId
            }
        case 'CARDS/SET_CARDS':
            return {
                ...state,
                cards: action.payload.cards,
                cardsTotalCount: action.payload.cardsTotalCount,
                page: action.payload.page,
                pageCount: action.payload.pageCount,
                maxGrade: action.payload.maxGrade,
                minGrade: action.payload.minGrade,
                packUserId: action.payload.packUserId,
            }
        case 'CARDS/SET_CARDS_PAGE':
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    page: action.payload.page
                }
            }
        case 'CARDS/SET_CARDS_PAGE_COUNT':
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    pageCount: action.payload.pageCount
                }
            }
        case 'CARDS/SET_CARD_NAME':
            return {
                ...state, queryParams: {
                    ...state.queryParams, cardName: action.payload.cardName
                }
            }
        case 'CARDS/SET_RESET_FILTER':
            return {
                ...state, resetFilter: action.payload.filter
            }
        default:
            return state
    }
}

export const setCardsNameAC = (cardName: string) => {
    return {
        type: 'CARDS/SET_CARD_NAME',
        payload: {cardName}
    } as const
}
export const setResetFilterAC = (filter: boolean) => {
    return {
        type: 'CARDS/SET_RESET_FILTER',
        payload: {filter}
    } as const
}
export const addNewCardAC = (cardName: string) => {
    return {
        type: 'CARDS/ADD_NEW_CARDS',
        payload: {cardName}
    } as const
}
export const setCardsPackIdAC = (currentCardsPackId: string) => {
    return {
        type: 'CARDS/SET_CARDS_ID',
        payload: {currentCardsPackId}
    } as const
}
export const setCardsAC = (cards: ResponseType) => {
    return {
        type: 'CARDS/SET_CARDS',
        payload: cards
    } as const
}
export const setCardsPageAC = (page: number) => {
    return {
        type: 'CARDS/SET_CARDS_PAGE',
        payload: {page}
    } as const
}
export const setCardsPageCountAC = (pageCount: number) => {
    return {
        type: 'CARDS/SET_CARDS_PAGE_COUNT',
        payload: {pageCount}
    } as const
}

export type newCard = {
    card: {
        question: string
        cardsPack_id: string
    }
}
export const addNewCardTC = (card: newCard): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardAPI.addNewCard(card)
        dispatch(getCardsTC())
        dispatch(addNewCardAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
    } finally {

    }
}

export const getCardsTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const {cardsPack_id} = getState().cards
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardAPI.getCard({cardsPack_id})
        dispatch(setCardsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут

    }

}

export type setCardsPackIdType = ReturnType<typeof setCardsPackIdAC>
export type setCardsType = ReturnType<typeof setCardsAC>
export type setCardsPageType = ReturnType<typeof setCardsPageAC>
export type setCardsPageCountType = ReturnType<typeof setCardsPageCountAC>
export type setCardsNameType = ReturnType<typeof setCardsNameAC>
export type setResetFilterType = ReturnType<typeof setResetFilterAC>

export type CardsReducerActionsType =
    | setCardsPackIdType
    | setCardsType
    | setCardsPageType
    | setCardsPageCountType
    | setCardsNameType
    | setResetFilterType