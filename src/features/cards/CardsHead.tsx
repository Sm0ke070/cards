import React, {useState} from 'react';
import {useAppDispatch} from "../../app/store";
import {addNewCardTC} from "./cardsReducer";
import Typography from "antd/es/typography";
import {Input} from "antd";
import Button from "antd/es/button";
import {Link} from "react-router-dom";
import {SuperModal} from '../../common/components/super-components/SuperModal/SuperModal';
import {FaLongArrowAltLeft} from "react-icons/fa";


type CardHeadPropsType = {
    cardsPack_id: string
}
export const CardsHead = (props: CardHeadPropsType) => {
    const {cardsPack_id} = props

    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(false)

    const dispatch = useAppDispatch()

    const showModalHandle = () => {
        setShowModal(true)

    }
    const handleOk = () => {
        dispatch(addNewCardTC({
            card: {
                question: name,
                cardsPack_id: cardsPack_id
            }
        }))
        setName('')
        setShowModal(false)
    }
    const handleCancel = () => {
        setShowModal(false)
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>

            <Link style={{textDecoration: 'none', color: 'black'}} to={routes.PACKS}>
                <FaLongArrowAltLeft/> Back to Packs List
            </Link>

            <Typography.Title level={1}>
                Cards List
            </Typography.Title>
            <SuperModal title={'Add new Card'} showModal={showModal} handleOkCallback={handleOk}
                        handleCancelCallback={handleCancel}>
                <Input value={name}
                       placeholder={'name Card'}
                       onChange={(e) => setName(e.currentTarget.value)}/>
            </SuperModal>
            <Button type="primary" onClick={showModalHandle}>Add Card</Button>

        </div>
    );
};
