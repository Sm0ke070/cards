import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useDebounce} from "usehooks-ts";
import {setCardsNameAC, setResetFilterAC} from "../cardsReducer";
import {Input} from "antd";

const FindCards = () => {

    const filter = useAppSelector(state => state.cards.resetFilter)
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(search, 700)

    useEffect(() => {
        if (filter || !search) {
            setSearch('')
            dispatch(setCardsNameAC(''))
            dispatch(setResetFilterAC(false))
        }

    }, [search])

    useEffect(() => {
        debouncedValue && dispatch(setCardsNameAC(debouncedValue))
    }, [debouncedValue])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value)
    }

    return (
        <div>
            <Input placeholder={'Search Cards'} value={search} onChange={handleChange} style={{width: '300px'}}/>
        </div>
    );
};

export default FindCards;