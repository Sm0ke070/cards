import React, {useEffect, useState} from 'react';
import {Segmented} from 'antd';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {getPacksTC, setResetFilterAC} from '../packsReducer';

export const ShowPacks = () => {
    const resetFilter = useAppSelector(state => state.packs.resetFilter)
    const [value, setValue] = useState<any>('ALL')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (resetFilter) {
            setValue('ALL')
            dispatch(setResetFilterAC(false))
        }
    }, [resetFilter])
    const onChangeHandler = (allOrMy: any) => {
        setValue(allOrMy)
        dispatch(getPacksTC(allOrMy))
    }


    return (
        <div>
            <Segmented options={['ALL', 'MY']} value={value} onChange={onChangeHandler}/>
        </div>
    );
};

