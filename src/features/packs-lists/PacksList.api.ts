import {instance} from "../../app/base-url";
import {AxiosResponse} from "axios";


export const PacksListAPI={
    getAllPacksList(){
        return instance.get<CarsPacksResponce>('cards/pack')
    },
    getMyPacksList(user_id:string){
        return instance.get<CarsPacksResponce>('cards/pack',{
            params : {
                user_id
            }
        })
    },
    newMyPack(name:string){
        return instance.post< {newCardsPack : createNewCardPackType}>('cards/pack',{cardsPack:{
            name:name
            }})
    }
}
export type AddPackModelType = {
    cardsPack: CardsPackType1
}

type CardsPackType1 = {
    name: string
    deckCover?: string
    private?: boolean
}

// export type PacksListType={
//     _id: string
//     user_id: string
//     name: string
//     cardsCount: number
//     created: string
//     updated: string
// }
export type createNewCardPackType={
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type CardsPackType = {
    _id: string
    user_id: string
    user_name: string
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