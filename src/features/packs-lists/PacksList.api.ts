import {instance} from "../../app/base-url";


export const PacksListAPI={
    getAllPacksList(){
        return instance.get<CarsPacksResponce>('cards/pack')
    },
    getMyPacksList(user_id:string){
        return instance.post<CarsPacksResponce>('cards/pack',{user_id})
    }
}

// export type PacksListType={
//     _id: string
//     user_id: string
//     name: string
//     cardsCount: number
//     created: string
//     updated: string
// }
export type CardsPackType = {
    "_id": string
    "user_id": string
    "user_name": string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    rating: number
}

export type CarsPacksResponce = {
    cardPacks: CardsPackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}
//{
//     "cardPacks": [
//
//     ],
//     "page": 1,
//     "pageCount": 4,
//     "cardPacksTotalCount": 1202,
//     "minCardsCount": 0,
//     "maxCardsCount": 78,
//     "token": "2d175010-ae2c-11ed-af93-dfc1e9ce55e1",
//     "tokenDeathTime": 1677178827665
// }