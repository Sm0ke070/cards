import React, {ChangeEvent, useEffect, useState} from 'react';
import SuperDoubleRange from '../../../common/components/SuperDoubleRange';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setCardCountAC} from '../packsSettingsReducer';
import {Input, Space} from "antd";
import {useDebounce} from "usehooks-ts";

export const NumberOfCards = () => {
    const dispatch = useAppDispatch()
    const totalMaxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const minCardsCount = useAppSelector(state => state.packsSettings.queryParams.min)
    const maxCardsCount = useAppSelector(state => state.packsSettings.queryParams.max)
    const resetFilter = useAppSelector(state => state.packsSettings.resetFilter)

    const [minCount, setMinCount] = useState(minCardsCount)
    const [maxCount, setMaxCount] = useState(maxCardsCount)

    const debouncedMinCount = useDebounce<number>(minCount, 1000)
    const debouncedMaxCount = useDebounce<number>(maxCount, 1000)


    useEffect(() => {
        if (debouncedMaxCount >= debouncedMinCount) {
            dispatch(setCardCountAC(minCount, maxCount))
        }

    }, [dispatch, resetFilter, debouncedMinCount, debouncedMaxCount])

    // меняет локальные данные
    const onChangeRange = (e: [number, number]) => {
        setMinCount(e[0])
        setMaxCount(e[1])
    }
    // отправляет данные в стейт, когда отпускается мышка
    const onAfterChangeRange = (e: [number, number]) => {
        dispatch(setCardCountAC(e[0], e[1]))
    }

    const onChangeMaxCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value <= totalMaxCardsCount) {
            setMaxCount(+e.currentTarget.value)
        }

    }
    const onChangeMinCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value < maxCount) {
            setMinCount(+e.target.value)
        }
    }

    return (
        <Space>
            <Input style={{width: '40px', textAlign: 'center'}}
                   size={'small'}
                   value={minCount}
                   onChange={onChangeMinCountHandler}

            />
            <SuperDoubleRange value={[minCount, maxCount]} onChangeRange={onChangeRange}
                              onAfterChangeRange={onAfterChangeRange}
                              max={totalMaxCardsCount}
            />
            <Input style={{width: '40px', textAlign: 'center'}}
                   size={'small'}
                   value={maxCount}
                   onChange={onChangeMaxCountHandler}
            />
        </Space>

    );
};

