import React from 'react';
import {Link, Redirect} from 'react-router-dom';

const Login = ({SetActiveUser}) => {
    const ConfirmLogin = e => {
        e.preventDefault();
        const remember = document.getElementById('remember').checked;
        const user = {username: e.target[0].value, password: e.target[1].value, remember};
        fetch('http://127.0.0.1:3000/api/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((res) => {
            const sessionId = res.sessionId;
            localStorage.setItem('sessionId', sessionId);

            if(res.auth === true) {
                SetActiveUser(res.payload);
            }
        })
    }
    return (
        <div className="container auth">
            <div id="login" className="micro-form">
                <img className="logo" src="../res/images/logo.svg"/>
                <h3>Please Login</h3>
                <form onSubmit={ConfirmLogin}>
                    <div className="input-group">
                        <input type="text" placeholder="Username"/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password"/>
                        <i className="fas fa-unlock-alt"></i>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" id="remember"/>
                            <span className="checkmark" checked="checked">
                                <i className="fas fa-check"></i>
                            </span> Remember Me
                        </label>
                    </div>
                    <button type="submit" className="btn">LOG IN</button>
                    <p className="sub-text">Or if you have a beta key feel free to sign up <Link to="/register">here</Link>!</p>
                </form>
            </div>
            <div className="bg-right">
                <img src="../res/images/login.svg"/>
            </div>
        </div>
    )
}

export default Login;