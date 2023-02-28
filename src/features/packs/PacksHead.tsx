import Button from 'antd/es/button';
import Typography from 'antd/es/typography';
import React, {useState} from 'react';
import {useAppDispatch} from '../../app/store';
import {addNewPacksTC} from './packsReducer';
import {Checkbox, Input} from 'antd';
import {SuperModal} from '../../common/components/super-components/SuperModal/SuperModal';

export const PacksHead = () => {
    const [name, setName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()

    const showModalHandle = () => {
        setShowModal(true)
    }
    const handleOk = () => {
        dispatch(addNewPacksTC({
            cardsPack: {
                name: name,
                private: isPrivate
            }
        }))
        setShowModal(false)
    }
    const handleCancel = () => {
        setShowModal(false)
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography.Title level={1}>
                Packs List
            </Typography.Title>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <SuperModal title={'Add new Pack'} showModal={showModal} handleOkCallback={handleOk}
                            handleCancelCallback={handleCancel}>
                    <Input value={name}
                           placeholder={'name Pack'}
                           width='30px'
                           onChange={(e) => setName(e.currentTarget.value)}/>
                    <br/>
                    <br/>
                    <Checkbox children={'Private'} value={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}/>
                </SuperModal>
                <Button type="primary" onClick={showModalHandle}>Add Pack</Button>
            </div>
        </div>
    );
};

