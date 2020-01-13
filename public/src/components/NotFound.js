import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const NotFound = ({ActiveUser}) => {
    return (
        <div className="container auth notfound">
            <div className="micro-form">
                <img className="logo" src="../res/images/logo.svg"/>
                <h2>Page not found</h2>
                <p>{window.location.href} is not a valid address, ensure you are logged in if you are attempting to access a protected resource.</p>
                <p>Return home by clicking <Link to={ActiveUser ? "/dashboard" : "/login"}>here</Link></p>
            </div>
            <div className="bg-right">
                <img src="../res/images/404.svg"/>
            </div>
        </div>
    )
}

export default NotFound;