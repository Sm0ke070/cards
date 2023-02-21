import React from 'react';
import {Link} from 'react-router-dom';
import {routes} from '../../constants/constants';
import {Button} from 'antd';

export  const Cards = () => {

   const  onClickHandler = ()=>{

   }
    return (
        <div>
            <Link to={routes.PACKS} >Back to Packs</Link>
            Hello World
            <Button onClick={onClickHandler}>Ajax Request</Button>
        </div>
    );
};

