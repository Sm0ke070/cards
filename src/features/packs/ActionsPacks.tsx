import React, {FC, SyntheticEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {deletePackTC, updatePackTC} from './packsReducer';
import {Button, Input, Tooltip} from 'antd';
import {BookTwoTone, DeleteTwoTone, EditTwoTone} from '@ant-design/icons';
import {SuperModal} from '../../common/components/super-components/SuperModal/SuperModal';
import {routes} from '../../constants/constants';
import {useNavigate} from 'react-router-dom';
import {setCardsPackIdAC} from '../cards/cardsReducer';

type ActionsPropsType = {
    packUserId: string
    packId: string
    name: string
    cardsCount:number
}
export const ActionsPacks: FC<ActionsPropsType> = ({packUserId, packId, name,cardsCount}) => {
    const [newName, setNewName] = useState(name)
    const [showModal, setShowModal] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const myId = useAppSelector(state => state.auth.userData._id)
    // проверка на свой-чужой. если userId в колоде и userId в сторе при логинизации равны, то disabled будет false
    const showEdit = myId === packUserId


    const onClickRemove = (e: SyntheticEvent) => {
        // у нас конфликт событий. два onClick на строке таблицы и на кнопке. при клике по кнопке мы вызываем stopPropagation который не позволяет событию всплывать дальше и выполнятся другим обработчикам
        e.stopPropagation()
        dispatch(deletePackTC(packId))
    }

    const onClickUpdate = (e: SyntheticEvent) => {
        e.stopPropagation()
        setShowModal(true)
    }
    const onClickLearn = (e: SyntheticEvent) => {
        e.stopPropagation()
        dispatch(setCardsPackIdAC(packId))
        navigate(routes.CARD_QUESTION)
    }
    const handleOk = (e: SyntheticEvent) => {
        e.stopPropagation()

        dispatch(updatePackTC({
            cardsPack: {
                _id: packId,
                name: newName,
            }
        }))
        setShowModal(false)
    }
    const handleCancel = (e: SyntheticEvent) => {
        e.stopPropagation()
        setShowModal(false)
    }
    // с поддержки комментарий- флоу работы с данными для изменений
    //const activeCardId = useAppSelector()
    // useEffect(() => {
    //     if (activeCardId) {
    //         //api.  .....(activeCardId)
    //     }
    //
    //     return () => {
    //         dispatch(.......(''))
    //     }
    // },[activeCardId])
    return (
        <div>
            <Tooltip title='Учить'>
                <Button onClick={e => onClickLearn(e)}
                        disabled={!cardsCount}
                        icon={<BookTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>
            {showEdit && <><Tooltip title='Удалить'>
                <Button onClick={e => onClickRemove(e)}
                        icon={<DeleteTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>
                <Tooltip title='Изменить'>
                    <SuperModal title={'Change name Pack'} showModal={showModal} handleOkCallback={handleOk}
                                handleCancelCallback={handleCancel}>
                        <Input value={newName}
                               placeholder={'name Pack'}
                               width='30px'
                               onChange={(e) => setNewName(e.currentTarget.value)}
                        />

                    </SuperModal>
                    <Button onClick={e => onClickUpdate(e)}
                            icon={<EditTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
                </Tooltip></>}

        </div>
    );
};

