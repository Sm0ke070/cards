import React, {FC, SyntheticEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {deletePackTC, updatePackTC} from './packsReducer';
import {Button, FloatButton, Space, Tooltip} from 'antd';
import {BookTwoTone, DeleteTwoTone, EditTwoTone, QuestionCircleOutlined, SyncOutlined} from '@ant-design/icons';
import * as fs from 'fs';

type ActionsPropsType = {
    packUserId: string
    packId: string
}
export const Actions: FC<ActionsPropsType> = ({packUserId, packId}) => {
    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.auth.userData._id)
    // проверка на свой-чужой. если userId в колоде и userId в сторе при логинизации равны, то disabled будет false
    const disabled = myId !== packUserId


    const onClickRemove = (e: SyntheticEvent) => {
        // у нас конфликт событий. два onClick на строке таблицы и на кнопке. при клике по кнопке мы вызываем stopPropagation который не позволяет событию всплывать дальше и выполнятся другим обработчикам
        e.stopPropagation()
        dispatch(deletePackTC(packId))
    }
    const onClickUpdate = (e: SyntheticEvent) => {
        e.stopPropagation()
        dispatch(updatePackTC({
            cardsPack: {
                _id: packId,
                name: 'Hard Data',
            }
        }))
    }
    return (
        <div>
            <Tooltip title='Удалить'>
                <Button onClick={e => onClickRemove(e)}
                        disabled={disabled}
                        icon={<DeleteTwoTone style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>
            <Tooltip title='Изменить'>

                <Button onClick={e => onClickUpdate(e)} disabled={disabled}
                        icon={<EditTwoTone  style={{fontSize: '18px', padding: '4px'}}/>}/>
            </Tooltip>

        </div>
    );
};

