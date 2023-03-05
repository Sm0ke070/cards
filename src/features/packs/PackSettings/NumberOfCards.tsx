import React, {ChangeEvent, useEffect, useState} from 'react';
import SuperDoubleRange from '../../../common/components/SuperDoubleRange';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setCardCountAC, setResetFilterAC} from '../packsSettingsReducer';
import {Input, Space} from "antd";

export const NumberOfCards = () => {
    const dispatch = useAppDispatch()
    const totalMaxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const minCardsCount = useAppSelector(state => state.packsSettings.queryParams.min)
    const maxCardsCount = useAppSelector(state => state.packsSettings.queryParams.max)
    const resetFilter = useAppSelector(state => state.packsSettings.resetFilter)

    const [minCardCount, setMinCardCount] = useState(minCardsCount)
    const [maxCardCount, setMaxCardCount] = useState(maxCardsCount)

    useEffect(() => {
        if (resetFilter) {
            setMinCardCount(minCardsCount)
            setMaxCardCount(maxCardsCount)
        }
        return ()=>{
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
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setMaxCardCount(+e.currentTarget.value)
    }
    const onChangeInputHandlerMIN = (e: ChangeEvent<HTMLInputElement>) => {

        setMinCardCount(+e.currentTarget.value)
    }

    return (
        <Space>
            <Input style={{width: '40px', textAlign: 'center'}}
                   size={'small'}
                   value={minCardCount}
                   onChange={e => onChangeInputHandlerMIN(e)}
            />
            <SuperDoubleRange value={[minCardCount, maxCardCount]} onChangeRange={onChangeRange}
                              onAfterChangeRange={onAfterChangeRange}
                              max={totalMaxCardsCount}
            />
            <Input style={{width: '40px', textAlign: 'center'}}
                   size={'small'}
                   value={maxCardCount}
                   onChange={e => onChangeInputHandler(e)}
            />
        </Space>

    );
};

