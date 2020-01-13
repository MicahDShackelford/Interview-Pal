import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Forbidden = ({ActiveUser}) => {
    return (
        <div className="container auth notfound">
            <div className="micro-form">
                <img className="logo" src="../res/images/logo.svg"/>
                <h2>Page Restricted</h2>
                <p>{window.location.href} is a restricted resource</p>
                <p>Please login by clicking <Link to={ActiveUser ? "/dashboard" : "/login"}>here</Link></p>
            </div>
            <div className="bg-right">
                <img src="../res/images/forbidden.svg"/>
            </div>
        </div>
    )
}

export default Forbidden;