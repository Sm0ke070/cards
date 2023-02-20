import React, {useEffect, useState} from 'react';
import SuperDoubleRange from '../../../common/components/SuperDoubleRange';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setCardCountAC, setResetFilterAC} from '../packsReducer';

export const NumberOfCards = () => {
    const dispatch = useAppDispatch()
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const resetFilter = useAppSelector(state => state.packs.resetFilter)

    const [minCardCount, setMinCardCount] = useState(minCardsCount)
    const [maxCardCount, setMaxCardCount] = useState(maxCardsCount)
    useEffect(() => {
        if (resetFilter) {
            setMinCardCount(minCardsCount)
            setMaxCardCount(maxCardsCount)
            dispatch(setResetFilterAC(false))
        }
    }, [resetFilter])
    // меняет локальные данные
    const onChangeRange = (e: [number, number]) => {
        setMinCardCount(e[0])
        setMaxCardCount(e[1])
    }
    // отправляет данные в стейт, когда отпускается мышка
    const onAfterChangeRange = (e: [number, number]) => {
        dispatch(setCardCountAC(e))
    }


    return (
        <SuperDoubleRange value={[minCardCount, maxCardCount]} onChangeRange={onChangeRange}
                          onAfterChangeRange={onAfterChangeRange}
                          max={maxCardsCount}
        />
    );
};

