import {instance} from "../../app/base-url";
import {sortingCardsMethods} from "../../constants/sortingMethods";
import {CardType, newCard} from "./cardsReducer";

export const cardAPI = {
    getCard(params: GetParamsType) {
        return instance.get<ResponseType>('/cards/card', {params})
    },
    addNewCard(card: newCard) {
        return instance.post('/cards/card', card)
    },
    deleteCard(id: string) {
        return instance.delete('/cards/card', {params: {id}})
    }
}

export type GetParamsType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: sortingCardsMethods
    page?: number
    pageCount?: number
}

export type ResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}