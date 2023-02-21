import React, {useState} from 'react';
import {useAppDispatch} from "../../app/store";
import {addNewCardTC} from "./cardsReducer";
import Typography from "antd/es/typography";
import {Input} from "antd";
import Button from "antd/es/button";

type CardHeadPropsType = {
    cardsPack_id: string
}
export const CardsHead = (props: CardHeadPropsType) => {
    const {cardsPack_id} = props

    const [name, setName] = useState('')
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(addNewCardTC({
            card: {
                question: name,
                cardsPack_id: cardsPack_id
            }
        }))
        setName('')
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography.Title level={1}>
                Cards List
            </Typography.Title>
            <div style={{display: 'flex', flexDirection: 'column'}}><Input value={name}
                                                                           placeholder={' временно! name Pack'}
                                                                           onChange={(e) => setName(e.currentTarget.value)}/>
                <Button type="primary" onClick={onClickHandler}>Add Card</Button></div>
        </div>
    );
};
