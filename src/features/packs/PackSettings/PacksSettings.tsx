import React from 'react';
import {FindPacks} from './FindPacks';
import {ShowPacks} from './ShowPacks';
import {NumberOfCards} from './NumberOfCards';
import {RiFilterOffLine} from 'react-icons/ri'
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setPacksPageAC, setPageCountAC, setResetFilterAC} from '../packsReducer';
import s from './PacksSettings.module.css'


export const PacksSettings = () => {


    const dispatch = useAppDispatch()
    const resetFilet = () => {
        dispatch(setPacksPageAC(1))
        dispatch(setPageCountAC(5))
        dispatch(setResetFilterAC(true))

    }


    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <FindPacks/>
            <ShowPacks/>
            <NumberOfCards/>
            <RiFilterOffLine className={s.filterIcon} size={'30px'}  onClick={resetFilet} />
        </div>
    );
};

