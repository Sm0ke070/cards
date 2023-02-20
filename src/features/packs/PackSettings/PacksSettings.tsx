import React from 'react';
import {FindPacks} from './FindPacks';
import {ShowPacks} from './ShowPacks';
import {NumberOfCards} from './NumberOfCards';
import {RiFilterOffLine} from 'react-icons/ri'
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setPacksPageAC, setPageCountAC, setResetFilterAC} from '../packsReducer';


export const PacksSettings = () => {

    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

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
            <RiFilterOffLine size={'30px'} color={'#91C9FF'} onClick={resetFilet}/>
        </div>
    );
};

