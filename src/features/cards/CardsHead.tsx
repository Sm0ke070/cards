import React from 'react';
import {useAppDispatch} from "../../app/store";
import {addNewCardTC} from "./cardsReducer";
import Typography from "antd/es/typography";
import Button from "antd/es/button";
import {Link} from "react-router-dom";
import {routes} from "../../constants/constants";
import {FaLongArrowAltLeft} from "react-icons/fa";

type CardHeadPropsType = {
    cardsPack_id: string
}
export const CardsHead = (props: CardHeadPropsType) => {

    const {cardsPack_id} = props
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(addNewCardTC({
            card: {
                question: 'HARD DATA',
                cardsPack_id: cardsPack_id
            }
        }))
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>

            <Link style={{textDecoration: 'none',color:'black'}} to={routes.PACKS}>
                <FaLongArrowAltLeft/> Back to Packs List
            </Link>

            <Typography.Title level={1}>
                Cards List
            </Typography.Title>

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button style={{width: '200px'}} type="primary" onClick={onClickHandler}>Add new card</Button>
            </div>
        </div>
    );
};
