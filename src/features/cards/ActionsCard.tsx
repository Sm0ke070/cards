import React, {SyntheticEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Button, Input, Tooltip} from "antd";
import {DeleteTwoTone, EditTwoTone} from "@ant-design/icons";
import {removeCardsTC} from "./cardsReducer";
import {SuperModal} from "../../common/components/super-components/SuperModal/SuperModal";

type ActionsCardPropsType = {
    cardUserId: string
    cardsPack_id: string
}
const ActionsCard = (props: ActionsCardPropsType) => {

    const {cardsPack_id} = props
    const dispatch = useAppDispatch()
    const [newName, setNewName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const myId = useAppSelector(state => state.auth.userData._id)

    //const disabled = myId !== packUserId

    const onClickRemove = (e: SyntheticEvent) => {
        console.log(cardsPack_id)
        e.stopPropagation()
        dispatch(removeCardsTC(cardsPack_id))
    }

    const onClickUpdate = (e: SyntheticEvent) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        setShowModal(true)
    }
    const handleOk = (e: SyntheticEvent) => {
        e.stopPropagation()
        // Нужно менять имя карточки!!
        // dispatch(updatePackTC({
        //     cardsPack: {
        //         _id: packId,
        //         name: newName,
        //     }
        // }))
        setShowModal(false)
    }
    const handleCancel = (e: SyntheticEvent) => {
        e.stopPropagation()
        setShowModal(false)
    }

    return (
        <div>
            <Tooltip title='Удалить'>
                <Button onClick={e => onClickRemove(e)}
                    // disabled={disabled}
                        icon={<DeleteTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>
            <Tooltip title='Изменить'>
                <SuperModal title={'Change name Card'} showModal={showModal} handleOkCallback={handleOk}
                            handleCancelCallback={handleCancel}>
                    <Input value={newName}
                           placeholder={'name Pack'}
                           width='30px'
                           onChange={(e) => setNewName(e.currentTarget.value)}
                    />

                </SuperModal>
                <Button onClick={e => onClickUpdate(e)}
                    // disabled={disabled}
                        icon={<EditTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>

        </div>
    );
};

export default ActionsCard;