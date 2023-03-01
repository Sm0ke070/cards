import React from 'react';
import {Rate} from "antd";
import ActionsCard from "../ActionsCard";

type RatingOfCardsPropsType = {
    value: number
    isMy: boolean
    packUserId: string
    question: string
    cardsPack_id: string
    cardUserId: string
}
const RatingOfCards = (props: RatingOfCardsPropsType) => {
    const {value, isMy, cardsPack_id, packUserId, cardUserId, question} = props

    const onChangeRateHandler = (value: number) => {
        alert(value)
    }

    return (
        <div style={{display: 'flex'}}>

            <Rate onChange={(defaultValue) => onChangeRateHandler(defaultValue)} disabled defaultValue={value}/>

            {isMy && <ActionsCard packUserId={packUserId}
                                  question={question}
                                  cardsPack_id={cardsPack_id}
                                  cardUserId={cardUserId}/>}

        </div>
    );
};

export default RatingOfCards;