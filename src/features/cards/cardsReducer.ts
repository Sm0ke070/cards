import {sortingCardsMethods} from '../../constants/sortingMethods';
import {Dispatch} from 'redux';
import {setAppStatusAC} from "../../app/AppReducer";
import {AppRootStateType} from "../../app/store";
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
                cards: [...action.payload.cards],
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
        default:
            return state
    }
}
export const setCardsPackIdAC = (currentCardsPackId: string) => ({
    type: 'CARDS/SET_CARDS_ID',
    payload: {currentCardsPackId}
} as const)
export const setCardsAC = (cards: any) => ({
    type: 'CARDS/SET_CARDS',
    payload: cards
} as const)
export const setCardsPageAC = (page: number) => ({type: 'CARDS/SET_CARDS_PAGE', payload: {page}} as const)
export const setCardsPageCountAC = (pageCount: number) => ({
    type: 'CARDS/SET_CARDS_PAGE_COUNT',
    payload: {pageCount}
} as const)


export const getCardsTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const {cardsPack_id} = getState().cards

    try {
        const res = await cardAPI.getCard({cardsPack_id})
        console.log(res.data.cards)
        dispatch(setCardsAC(res.data))

    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут

    }

}

export type setCardsPackIdType = ReturnType<typeof setCardsPackIdAC>
export type setCardsType = ReturnType<typeof setCardsAC>
export type setCardsPageType = ReturnType<typeof setCardsPageAC>
export type setCardsPageCountType = ReturnType<typeof setCardsPageCountAC>

export type CardsReducerActionsType =
    | setCardsPackIdType
    | setCardsType
    | setCardsPageType
    | setCardsPageCountType