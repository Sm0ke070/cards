import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {deletePack, updatePack} from './packsReducer';
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
        dispatch(deletePack(packId))
    }
    const onClickUpdate = () => {
        dispatch(updatePack({
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

