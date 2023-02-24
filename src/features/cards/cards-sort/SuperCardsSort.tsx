import React from 'react';
import {sortingCardsMethods} from "../../../constants/sortingMethods";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";

export type SuperCardsSortPropsType = {
    sort: sortingCardsMethods
    value: string
    onChange: (newSort: sortingCardsMethods) => void
}
export const pureChange = (sort: sortingCardsMethods, down: sortingCardsMethods, up: sortingCardsMethods) => {
    const newSort = sort === down ? up : down
    return newSort
}
const SuperCardsSort = (props: SuperCardsSortPropsType) => {

    const {value, onChange, sort} = props

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }
    const up = '0' + value as sortingCardsMethods
    const down = '1' + value as sortingCardsMethods

    const icon = sort === down
        ? <CaretDownOutlined/>
        : <CaretUpOutlined/>

    return (
        <span onClick={onChangeCallback}>
            {icon}
        </span>
    );
};

export default SuperCardsSort;