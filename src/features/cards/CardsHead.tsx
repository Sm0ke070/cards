import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {addNewCardTC} from "./cardsReducer";
import Typography from "antd/es/typography";
import {Dropdown, Input, MenuProps, Space} from "antd";
import Button from "antd/es/button";
import {Link, useNavigate} from "react-router-dom";
import {SuperModal} from '../../common/components/super-components/SuperModal/SuperModal';
import {FaLongArrowAltLeft} from "react-icons/fa";
import {routes} from "../../constants/constants";
import {EllipsisOutlined} from '@ant-design/icons';
import {setResetFilterAC} from '../packs/packsSettingsReducer';


type CardHeadPropsType = {
    cardsPack_id: string
    packUserId: string
}
const items: MenuProps['items'] = [
    {
        label: (
            <Link to={routes.CARD_QUESTION}>
                Учить
            </Link>
        ),
        key: '0',
    },
    {
        label: 'Изменить (тут появляется модалка)',
        key: '1',
    },
    {
        label: 'Удалить',
        key: '2',
    },
];

export const CardsHead = (props: CardHeadPropsType) => {
    const {cardsPack_id, packUserId} = props

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const currentCardName = useAppSelector(state => state.cards.currentCardName)

    const myId = useAppSelector(state => state.auth.userData._id)
    const MyCardMode = myId === packUserId

    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(false)


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

    const learnHandler = () => {
        navigate(routes.CARD_QUESTION)
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>

            <div>
                <Link style={{textDecoration: 'none', color: 'black'}} to={routes.PACKS}
                      onClick={() => dispatch(setResetFilterAC(true))}>
                    <FaLongArrowAltLeft/> Back to Packs List
                </Link>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex'}}>
                        <Typography.Title level={1}>
                            {currentCardName}
                        </Typography.Title>
                        {MyCardMode && <Dropdown menu={{items}} placement="bottomLeft">
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <EllipsisOutlined
                                        style={{fontSize: '30px', margin: '15px 0px 0px 10px'}}/>
                                </Space>
                            </a>
                        </Dropdown>}
                    </div>
                    {!MyCardMode && <Button type="primary" onClick={learnHandler}>Learn</Button>}
                    {MyCardMode && <Button type="primary" onClick={showModalHandle}>Add Card</Button>}
                </div>
            </div>

            <SuperModal title={'Add new Card'}
                        showModal={showModal}
                        handleOkCallback={handleOk}
                        handleCancelCallback={handleCancel}>

                <Input value={name}
                       placeholder={'Card\'s name '}
                       onChange={(e) => setName(e.currentTarget.value)}/>
            </SuperModal>


        </div>
    );
};
