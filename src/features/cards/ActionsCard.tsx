import React, {SyntheticEvent} from 'react';
import {useAppDispatch} from "../../app/store";
import {Button, Tooltip} from "antd";
import {DeleteTwoTone} from "@ant-design/icons";
import {removeCardsTC} from "./cardsReducer";

type ActionsCardPropsType = {
    cardUserId: string
    cardsPack_id: string
}
const ActionsCard = (props: ActionsCardPropsType) => {

    const {cardsPack_id} = props
    const dispatch = useAppDispatch()


    const onClickRemove = (e: SyntheticEvent) => {
        console.log(cardsPack_id)
        e.stopPropagation()
        dispatch(removeCardsTC(cardsPack_id))
    }
    return (
        <div>
            <Tooltip title='Удалить'>
                <Button onClick={e => onClickRemove(e)}
                        icon={<DeleteTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>
        </div>
    );
};

export default ActionsCard;