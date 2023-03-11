import {instance} from '../../app/base-url';
import {sortingPacksMethods} from '../../constants/sortingMethods';
import {NewPackType, UpdatePackType} from './PackSettings/packsSettingsReducer';


export const packsAPI = {
    getPacks(params: GetParamsType) {
        return instance.get<ResponseType>('/cards/pack', {params})
    },
    addPack(params: NewPackType) {
        return instance.post('/cards/pack', params)
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack/`, {params: {id}})
    },
    updatePack(params: UpdatePackType) {
        return instance.put(`/cards/pack/`, params)
    }
}
export type GetParamsType = {
    page: number
    pageCount: number
    packName: string
    user_id: string
    min: number
    max: number
    sortPacks: sortingPacksMethods
}

export type PackType = {
    _id: string;
    deckCover?: string
    user_id: string;
    user_name: string;
    name: string;
    private: boolean;
    path: string;
    grade: number;
    shots: number;
    cardsCount: number;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}

export type ResponseType = {
    cardPacks: PackType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
}
