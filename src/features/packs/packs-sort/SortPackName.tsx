import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {sortingPacksMethods} from '../../../constants/sortingMethods';
import SuperSort from '../../../common/components/super-components/SuperSort/SuperSort';
import {setSortPacksMethodAC} from '../packsSettingsReducer';

export const SortPackName = () => {
    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.packsSettings.queryParams.sortPacks)

    const onClickSort = (newSort: sortingPacksMethods) => {
        dispatch(setSortPacksMethodAC(newSort))
    }

    return (
        <div>
            <span>Name</span>
            <SuperSort sort={sort} value={'name'} onChange={onClickSort}/>
        </div>
    );
};
