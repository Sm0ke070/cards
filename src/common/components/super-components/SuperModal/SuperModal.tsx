import React, {FC, PropsWithChildren, SyntheticEvent} from 'react';
import {Modal} from 'antd';

type SuperModalType = {
    handleOkCallback: (e: SyntheticEvent) => void
    handleCancelCallback: (e: SyntheticEvent) => void
    showModal: boolean
    title: string
}
export const SuperModal: FC<PropsWithChildren<SuperModalType>> = ({
                                                                      children, showModal,
                                                                      handleOkCallback,
                                                                      handleCancelCallback, title
                                                                  }) => {
    return (
        <Modal title={title} open={showModal} onOk={e => handleOkCallback(e)} onCancel={e => handleCancelCallback(e)}>
            <div style={{padding: '10px'}}>
                {children}
            </div>
        </Modal>
    );
};

