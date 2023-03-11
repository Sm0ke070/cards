import React, {FC, SyntheticEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {Button, Input, message, Popconfirm, Tooltip} from 'antd';
import {BookTwoTone, DeleteTwoTone, EditTwoTone} from '@ant-design/icons';
import {SuperModal} from '../../common/components/super-components/SuperModal/SuperModal';
import {routes} from '../../constants/constants';
import {useNavigate} from 'react-router-dom';
import {setCardsPackIdAC, setCurrentCardNameAC} from '../cards/cardsReducer';
import {deletePackTC, updatePackTC} from './PackSettings/packsSettingsReducer';
import {defaultCover} from '../../common/components/image-loader/emptyCoverImage';
import {InputTypeFile} from '../../common/components/image-loader/InputTypeFile';

type ActionsPropsType = {
    packUserId: string
    packId: string
    name: string
    cardsCount: number
    deckCover?: string
}
export const ActionsPacks: FC<ActionsPropsType> = ({packUserId, packId, name, cardsCount, deckCover}) => {
    const [newName, setNewName] = useState(name)
    const [showModal, setShowModal] = useState(false)
    const [deckCoverImage, setDeckCoverImage] = useState('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const myId = useAppSelector(state => state.auth.userData._id)
    // проверка на свой-чужой. если userId в колоде и userId в сторе при логинизации равны, то disabled будет false
    const showEdit = myId === packUserId


    // const onClickRemove = (e: SyntheticEvent) => {
    //     // у нас конфликт событий. два onClick на строке таблицы и на кнопке. при клике по кнопке мы вызываем stopPropagation который не позволяет событию всплывать дальше и выполнятся другим обработчикам
    //     e.stopPropagation()
    //     dispatch(deletePackTC(packId))
    // }

    const onClickUpdate = (e: SyntheticEvent) => {
        e.stopPropagation()
        setShowModal(true)
    }
    const onClickLearn = (e: SyntheticEvent) => {
        e.stopPropagation()
        dispatch(setCardsPackIdAC(packId))
        dispatch(setCurrentCardNameAC(name))
        navigate(routes.CARD_QUESTION)
    }

    const handleOk = (e: SyntheticEvent) => {
        e.stopPropagation()

        dispatch(updatePackTC({
            cardsPack: {
                _id: packId,
                deckCover: deckCoverImage,
                name: newName,
            }
        }))
        setShowModal(false)
        message.success('Колода изменена');
    }
    const handleCancel = (e: SyntheticEvent) => {
        e.stopPropagation()
        setShowModal(false)
    }
    const onLoadImage = (image: string) => {
        setDeckCoverImage(image)
    }
    const confirmRemove = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
         e?.stopPropagation()
        dispatch(deletePackTC(packId))
        message.success('Колода удалена');
    };

    return (
        <div>
            <Tooltip title='Учить'>
                <Button onClick={e => onClickLearn(e)}
                        disabled={!cardsCount}
                        icon={<BookTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>
            {showEdit && <>

                <Popconfirm
                    title="Удалить"
                    description="Вы уверены, что хотите удалить колоду?"
                    onConfirm={confirmRemove}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Tooltip title='Удалить'>
                        <Button
                                icon={<DeleteTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
                    </Tooltip>
                </Popconfirm>
                <Tooltip title='Изменить'>
                    <SuperModal title={'Change name Pack'} showModal={showModal} handleOkCallback={handleOk}
                                handleCancelCallback={handleCancel}>
                        <Input value={newName}
                               placeholder={'name Pack'}
                               width='30px'
                               onChange={(e) => setNewName(e.currentTarget.value)}
                        />
                        <InputTypeFile onLoad={onLoadImage} defaultImage={deckCover}/>
                        {/*<img src={deckCover ? deckCover : defaultCover} alt="Картинка" width={150}/>*/}
                    </SuperModal>
                    <Button onClick={e => onClickUpdate(e)}
                            icon={<EditTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
                </Tooltip></>}

        </div>
    );
};


