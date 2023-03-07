import React from 'react';
import {FindPacks} from './FindPacks';
import {ShowPacks} from './ShowPacks';
import {NumberOfCards} from './NumberOfCards';
import {RiFilterOffLine} from 'react-icons/ri'
import {useAppDispatch} from '../../../app/store';
import s from './PacksSettings.module.css'
import {setCardCountAC, setPacksPageAC, setPageCountAC, setResetFilterAC} from '../packsSettingsReducer';


export const PacksSettings = () => {


    const dispatch = useAppDispatch()
    const resetFilter = () => {
        dispatch(setCardCountAC(0,110))
        dispatch(setPacksPageAC(1))
        dispatch(setPageCountAC(5))
        dispatch(setResetFilterAC(true))

    }


    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <FindPacks/>
            <ShowPacks/>
            <NumberOfCards/>
            <RiFilterOffLine className={s.filterIcon} size={'30px'} onClick={resetFilter}/>
        </div>
    );
};

