import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {sortingPacksMethods} from '../../../constants/sortingMethods';
import SuperSort from '../../../common/components/super-components/SuperSort/SuperSort';
import {setSortPacksMethodAC} from '../packsSettingsReducer';

export const SortPacksCards = () => {
    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.packsSettings.queryParams.sortPacks)

    const onClickSort = (newSort: sortingPacksMethods) => {
        dispatch(setSortPacksMethodAC(newSort))
    }

    return (
        <div>
            <span>Cards</span>
            <SuperSort sort={sort} value={'cardsCount'} onChange={onClickSort}/>
        </div>
    );
};
