import React from 'react';
import s from './emptyList.module.css'

export const EmptyList = () => {
    return (
        <div className={s.emptyList}><h3>
            Колоды с введенным названием не найдены. Измените параметры запроса
        </h3>
        </div>
    );
};

