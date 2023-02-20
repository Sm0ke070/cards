import Button from 'antd/es/button';
import Typography from 'antd/es/typography';
import React, {useState} from 'react';
import {useAppDispatch} from '../../app/store';
import {addNewPacks} from './packsReducer';
import {Input} from 'antd';

export const PacksHead = () => {
    const [name,setName] =useState('')
const dispatch = useAppDispatch()
    const onClickHandler=()=>{
        dispatch(addNewPacks({
            cardsPack: {
                name: name,
                private: false
            }
        }))
    }
    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Typography.Title  level={1}>
                Packs List
            </Typography.Title>
            <div style={{display:'flex',flexDirection:'column'}}><Input value={name} placeholder={' временно! name Pack'} onChange={(e) => setName(e.currentTarget.value)}/>
                <Button type="primary" onClick={onClickHandler}>Add Pack</Button></div>
        </div>
    );
};

