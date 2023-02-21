import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from 'usehooks-ts';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setPackNameAC, setResetFilterAC} from '../packsReducer';
import {Input} from 'antd';

export const FindPacks = () => {
    const resetFilter = useAppSelector(state => state.packs.resetFilter)
    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(value, 700)

    useEffect(() => {
        if (resetFilter) {
            setValue('')
            dispatch(setPackNameAC(''))
            dispatch(setResetFilterAC(false))
        }
    }, [resetFilter])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        debouncedValue && dispatch(setPackNameAC(debouncedValue))
    }, [debouncedValue])
    return (
        <div>
            <Input placeholder={'Search Pack'}value={value} onChange={handleChange} style={{width: '300px'}}
            />
        </div>
    );
};

