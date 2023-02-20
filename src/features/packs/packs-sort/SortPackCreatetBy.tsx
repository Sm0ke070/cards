import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setSortPacksMethodAC} from '../packsReducer';
import {sortingPacksMethods} from '../../../constants/sortingMethods';
import SuperSort from './SuperSort';

export const SortPackCreatedBy = () => {
    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.packs.queryParams.sortPacks)

    const onClickSort = (newSort: sortingPacksMethods) => {
        dispatch(setSortPacksMethodAC(newSort))
    }

    return (
        <div>
            <span>Created by</span>
            <SuperSort sort={sort} value={'user_name'} onChange={onClickSort}/>
        </div>
    );
};
