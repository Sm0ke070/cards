import React from 'react';
import {FindPacks} from './FindPacks';
import {ShowPacks} from './ShowPacks';
import {NumberOfCards} from './NumberOfCards';


export  const PacksSettings = () => {
    return (
        <div style={{display:'flex'}}>
            <FindPacks/>
            <ShowPacks/>
            <NumberOfCards/>
        </div>
    );
};

