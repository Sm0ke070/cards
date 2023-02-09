import React from 'react';
import {Link} from "react-router-dom";

const CheckEmail = () => {
    return (
        <div>
            <h1>Check Email</h1>
            <Link to={'/sign-in'}>Back to login</Link>
        </div>
    );
};

export default CheckEmail;