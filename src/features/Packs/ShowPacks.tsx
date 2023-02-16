import React, {useEffect, useState} from 'react';
import {Segmented} from 'antd';
import {useAppDispatch} from '../../app/store';
import {getPacks} from './packsReducer';

export const ShowPacks = () => {

    const [value,setValue] = useState<any>('ALL')
    const dispatch = useAppDispatch()

    const onChangeHandler = (allOrMy:any)=>{
        setValue(allOrMy)
        dispatch(getPacks(allOrMy))
    }


    return (
        <div>
            <Segmented options={['ALL','MY']} value={value} onChange={onChangeHandler} />
        </div>
    );
};

