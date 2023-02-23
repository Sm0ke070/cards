import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import React from 'react';
import {sortingPacksMethods} from '../../../../constants/sortingMethods';

export type SuperSortPropsType = {
    sort: sortingPacksMethods
    value: string
    onChange: (newSort: sortingPacksMethods) => void
}

export const pureChange = (sort: sortingPacksMethods, down: sortingPacksMethods, up: sortingPacksMethods) => {
    const newSort = sort === down? up:down
    return newSort
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange
    }
) => {
    const up = '0' + value as sortingPacksMethods
    const down = '1' + value as sortingPacksMethods

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }
    const icon = sort === down
        ? <CaretDownOutlined/>
        : <CaretUpOutlined/>


    return (
        <span
            onClick={onChangeCallback}
        >
            {icon}
        </span>
    )
}

export default SuperSort