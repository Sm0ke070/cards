import React from 'react';
import SuperButton from "./SuperButton/SuperButton";
import SuperInputText from "./SuperInputText/SuperInputText";
import SuperCheckbox from "./SuperCheckbox/SuperCheckbox";
import {useAppSelector} from "../../../app/store";

const Test = () => {
    const name = useAppSelector(state => state.auth.userData.name)
    const _id = useAppSelector(state => state.auth.userData._id)
    const CardPacks = useAppSelector(state => state.auth.userData.publicCardPacksCount)

    return (
        <div>

            <p>{name}</p>
            <p>{_id}</p>
            <p>{CardPacks}</p>


            <h1>Test</h1>
            <SuperButton/>
            <SuperInputText/>
            <SuperCheckbox/>
        </div>
    );
};

export default Test;