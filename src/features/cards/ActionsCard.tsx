import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Button, Input, Popconfirm, Tooltip} from "antd";
import {DeleteTwoTone, EditTwoTone} from "@ant-design/icons";
import {changeCardNameTC, removeCardsTC} from "./cardsReducer";
import {SuperModal} from "../../common/components/super-components/SuperModal/SuperModal";

type ActionsCardPropsType = {
    cardUserId: string
    cardsPack_id: string
    question: string
    packUserId: string
}
const ActionsCard = (props: ActionsCardPropsType) => {
    const {cardsPack_id, question, packUserId} = props

    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.auth.userData._id)
    const showEdit = myId === packUserId

    useEffect(() => {
        setNewName(question)
    }, [question])

    const [newName, setNewName] = useState('')
    const [showModalChange, setShowModalChange] = useState(false)
    const [showModalRemove, setShowModalRemove] = useState(false)

    //const disabled = myId !== packUserId

    const onRemoveCardsHandler = (e: SyntheticEvent) => {
        console.log(cardsPack_id)
        e.stopPropagation()
        //dispatch(removeCardsTC(cardsPack_id))
        setShowModalRemove(true)
    }
    const handleOkRemove = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(removeCardsTC(cardsPack_id))
        // setShowModalChange(false)
    }
    const handleCancelRemove = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        //setShowModalRemove(false)
    }

    const onClickUpdate = (e: SyntheticEvent) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        setShowModalChange(true)
    }
    const handleOkChanges = (e: SyntheticEvent) => {
        e.stopPropagation()
        dispatch(changeCardNameTC(cardsPack_id, newName))
        setShowModalChange(false)
    }
    const handleCancelChanges = (e: SyntheticEvent) => {
        e.stopPropagation()
        setShowModalChange(false)
    }

    return (
        <div>
            {showEdit &&
                <>
                    <Popconfirm title={'Delete question?'}
                                onConfirm={(e) => e && handleOkRemove(e)}
                                onCancel={(e) => e && handleCancelRemove(e)}>

                        <Button onClick={e => onRemoveCardsHandler(e)}
                            // disabled={disabled}
                                icon={<DeleteTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>

                    </Popconfirm>

                    <Tooltip title='Change name Card'>
                        <SuperModal title={'Change name Card'}
                                    showModal={showModalChange}
                                    handleOkCallback={handleOkChanges}
                                    handleCancelCallback={handleCancelChanges}>

                            <Input value={newName}
                                   placeholder={'Card\'s name'}
                                   width='30px'
                                   onChange={(e) => setNewName(e.currentTarget.value)}/>

                        </SuperModal>
                        <Button onClick={e => onClickUpdate(e)}
                            // disabled={disabled}
                                icon={<EditTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
                    </Tooltip>
                </>
            }
        </div>
    );
};

export default ActionsCard;