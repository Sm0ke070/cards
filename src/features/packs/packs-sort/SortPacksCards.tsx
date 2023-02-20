import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setSortPacksMethod} from '../packsReducer';
import {sortingPacksMethods} from '../../../constants/sortingMethods';
import SuperSort from './SuperSort';

export const SortPacksCards = () => {
    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.packs.queryParams.sortPacks)

    const onClickSort = (newSort: sortingPacksMethods) => {
        dispatch(setSortPacksMethod(newSort))
    }

    return (
        <div>
            <span>Cards</span>
            <SuperSort sort={sort} value={'cardsCount'} onChange={onClickSort}/>
        </div>
    );
};
