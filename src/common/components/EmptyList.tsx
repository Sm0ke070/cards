import React from 'react';
import s from './emptyList.module.css'
import {Empty} from 'antd';

export const EmptyList = () => {
    return (
        <div className={s.emptyList}>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{height: 100}}
                description={
                    <h3>
                        Колоды с введенным названием не найдены. Измените параметры запроса
                    </h3>
                }
            ></Empty>

        </div>
    );
};

