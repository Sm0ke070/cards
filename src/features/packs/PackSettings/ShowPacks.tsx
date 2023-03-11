import React, {useEffect} from 'react';
import {Segmented} from 'antd';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setAllOrMyAC, setResetFilterAC} from './packsSettingsReducer';
import {getPacksTC} from '../packsReducer';

export const ShowPacks = () => {
    const resetFilter = useAppSelector(state => state.packsSettings.resetFilter)
    const allOrMy = useAppSelector(state => state.packsSettings.allOrMy)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (resetFilter) {
            dispatch(setAllOrMyAC(allOrMy))
        }
        return () => {
            dispatch(setResetFilterAC(false))
        }
    }, [resetFilter])
    const onChangeHandler = (allOrMy: any) => {
        dispatch(setAllOrMyAC(allOrMy))
        dispatch(getPacksTC(allOrMy))
    }


    return (
        <div>
            <Segmented style={{backgroundColor: '#91C9FF'}}
                       options={['ALL', 'MY']}
                       value={allOrMy}
                       onChange={onChangeHandler}/>
        </div>
    );
};

