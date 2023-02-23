import React, {FC, SyntheticEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {deletePackTC, updatePackTC} from './packsReducer';
import {Button, Input, Tooltip} from 'antd';
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons';
import {SuperModal} from '../../common/components/super-components/SuperModal/SuperModal';

type ActionsPropsType = {
    packUserId: string
    packId: string
}
export const Actions: FC<ActionsPropsType> = ({packUserId, packId}) => {
    const [newName, setNewName] = useState('')
    const [showModal, setShowModal] = useState(false)

    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.auth.userData._id)
    // проверка на свой-чужой. если userId в колоде и userId в сторе при логинизации равны, то disabled будет false
    const disabled = myId !== packUserId


    const onClickRemove = (e: SyntheticEvent) => {
        // у нас конфликт событий. два onClick на строке таблицы и на кнопке. при клике по кнопке мы вызываем stopPropagation который не позволяет событию всплывать дальше и выполнятся другим обработчикам
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()

        dispatch(deletePackTC(packId))
    }

    const onClickUpdate = (e: SyntheticEvent) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        setShowModal(true)
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
    return (
        <div>
            <Tooltip title='Удалить'>
                <Button onClick={e => onClickRemove(e)}
                        disabled={disabled}
                        icon={<DeleteTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>
            <Tooltip title='Изменить'>
                <SuperModal title={'Change name Pack'} showModal={showModal} handleOkCallback={e=>handleOk(e)}
                            handleCancelCallback={e=>handleCancel(e)}>
                    <Input value={newName}
                           placeholder={'name Pack'}
                           width='30px'
                           onChange={(e) => setNewName(e.currentTarget.value)}
                    />

                </SuperModal>
                <Button onClick={e => onClickUpdate(e)}
                        disabled={disabled}
                        icon={<EditTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>

        </div>
    );
};

