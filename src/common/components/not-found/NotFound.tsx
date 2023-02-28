import React from 'react';
import {routes} from "../../../constants/constants";
import {FaLongArrowAltLeft} from "react-icons/fa";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>Page not found</h1>
            <Link to={routes.PACKS} style={{textDecoration: 'none', color: 'black'}}>
                <FaLongArrowAltLeft/> Back to Packs List
            </Link>
        </div>
    );
};

export default NotFound;