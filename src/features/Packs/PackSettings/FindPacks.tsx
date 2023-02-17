import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from 'usehooks-ts';
import {useAppDispatch} from '../../../app/store';
import {getPacks, setPackName} from '../packsReducer';
import {Input} from 'antd';

export const FindPacks = () => {
    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(value, 700)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        debouncedValue && dispatch(setPackName(debouncedValue))
    }, [debouncedValue])
    return (
        <div>
            <Input value={value} onChange={handleChange} style={{width:'300px'}}/>
        </div>
    );
};

