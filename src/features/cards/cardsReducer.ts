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
    resetFilter: false,
    queryParams: {
        pageCount: 5,
        page: 1,
        cardName: '',
        sortCards: sortingCardsMethods.desUpdate
    },
}


type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
}


export const getCard = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    //const {_id} = getState().packs.cardPacks

    try {
        //const res = await cardAPI.getCard()
    } catch (e) {
        dispatch(setAppStatusAC('failed'))//временно тут

    }

}

