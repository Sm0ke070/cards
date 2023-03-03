import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from 'usehooks-ts';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {Input} from 'antd';
import {setPackNameAC, setResetFilterAC} from '../packsSettingsReducer';

export const FindPacks = () => {
    const resetFilter = useAppSelector(state => state.packsSettings.resetFilter)
    const packName = useAppSelector(state => state.packsSettings.queryParams.packName)

    const [value, setValue] = useState<string>(packName)
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(value, 700)

    useEffect(() => {
        if (resetFilter) {
            setValue('')
            dispatch(setPackNameAC(''))
        }
        return () => {
            dispatch(setResetFilterAC(false))
        }
    }, [resetFilter])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        dispatch(setPackNameAC(debouncedValue))
    }, [debouncedValue])
    return (
        <div>
            <Input placeholder={'Search Pack'} value={value} onChange={handleChange} style={{width: '300px'}}
            />
        </div>
    );
};

