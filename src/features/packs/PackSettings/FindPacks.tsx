import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDebounce} from 'usehooks-ts';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {getPacks, setPackName, setResetFilter} from '../packsReducer';
import {Input} from 'antd';

export const FindPacks = () => {
    const resetFilter = useAppSelector(state => state.packs.resetFilter)
    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(value, 700)

    useEffect(()=>{
        if (resetFilter) {
            setValue('')
            dispatch(setPackName(''))
            dispatch(setResetFilter(false))
        }
    },[resetFilter])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        debouncedValue && dispatch(setPackName(debouncedValue))
    }, [debouncedValue])
    return (
        <div>
            <Input value={value} onChange={handleChange} style={{width:'300px'}}
            />
        </div>
    );
};

