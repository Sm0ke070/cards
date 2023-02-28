import React, {useEffect} from 'react';
import {Segmented} from 'antd';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {getPacksTC, setAllOrMyAC, setResetFilterAC} from '../packsReducer';

export const ShowPacks = () => {
    const resetFilter = useAppSelector(state => state.packs.resetFilter)
    const allOrMy = useAppSelector(state => state.packs.allOrMy)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (resetFilter) {
            dispatch(setAllOrMyAC('ALL'))
            dispatch(setResetFilterAC(false))
        }
    }, [resetFilter])
    const onChangeHandler = (allOrMy: any) => {
        dispatch(setAllOrMyAC(allOrMy))
        dispatch(getPacksTC(allOrMy))
    }


    return (
        <div>
            <Segmented options={['ALL', 'MY']} value={allOrMy} onChange={onChangeHandler}/>
        </div>
    );
};

