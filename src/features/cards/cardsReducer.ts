import {sortingCardsMethods} from '../../constants/sortingMethods';
import {Dispatch} from 'redux';
import {setAppStatusAC} from "../../app/AppReducer";
import {AppRootStateType} from "../../app/store";
import {cardAPI} from "./cardAPI";

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
    page: 0,
    pageCount: 0,
    packUserId: '',
    currentPackId: '',
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
        case 'PACKS/SET_CARDS_ID':
            return {
                ...state, currentPackId: action.payload.cardId
            }
        default:
            return state
    }
}
export const setCardsPackIdAC = (cardId: string) => ({type: 'PACKS/SET_CARDS_ID', payload: {cardId}} as const)

export const getCard = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    //const {_id} = getState().packs.cardPacks

    try {
        //const res = await cardAPI.getCard()
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут

    }

}

export type setCardsPackIdType = ReturnType<typeof setCardsPackIdAC>

export type CardsReducerActionsType = setCardsPackIdType