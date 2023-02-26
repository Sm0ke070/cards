import React from 'react';
import {Rate} from "antd";

type RatingOfCardsPropsType = {
    value: number
}
const RatingOfCards = (props: RatingOfCardsPropsType) => {
    const {value} = props

    const onChangeRateHandler = (value: number) => {
        alert(value)
    }

    return (
        <>
            <Rate onChange={(defaultValue) => onChangeRateHandler(defaultValue)} disabled defaultValue={value}/>
        </>
    );
};

export default RatingOfCards;