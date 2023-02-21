import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {deletePackTC, updatePackTC} from './packsReducer';
import {Button} from 'antd';

type ActionsPropsType = {
    packUserId: string
    packId: string
}
export const Actions: FC<ActionsPropsType> = ({packUserId, packId}) => {
    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.auth.userData._id)
    // проверка на свой-чужой. если userId в колоде и userId в сторе при логинизации равны, то disabled будет false
    const disabled = myId !== packUserId
    const onClickRemove = () => {
        dispatch(deletePackTC(packId))
    }
    const onClickUpdate = () => {
        dispatch(updatePackTC({
            cardsPack: {
                _id: packId,
                name: 'Hard Data',
            }
        }))
    }
    return (
        <div>
            <Button onClick={onClickRemove} disabled={disabled}>Удалить</Button>
            <Button onClick={onClickUpdate} disabled={disabled}>Обновить</Button>
        </div>
    );
};

