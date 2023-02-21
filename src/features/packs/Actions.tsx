import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {deletePackTC, updatePackTC} from './packsReducer';
import {Button, FloatButton, Tooltip} from 'antd';
import {QuestionCircleOutlined, SyncOutlined} from '@ant-design/icons';

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
           <Tooltip title='Удалить'><Button shape={'circle'} onClick={onClickRemove} disabled={disabled}>Удалить</Button> </Tooltip>

            <FloatButton.Group shape="square" style={{ right: 94 }}>
                <FloatButton icon={<QuestionCircleOutlined />} />
                <FloatButton />
                <FloatButton icon={<SyncOutlined />} />
                <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>
            <Button onClick={onClickUpdate} disabled={disabled}>Обновить</Button>
        </div>
    );
};

