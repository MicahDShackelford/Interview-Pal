import React from 'react';

const Login = () => {
    return (
        <div className="container auth">
            <div id="login" className="micro-form">
                <img className="logo" src="../res/images/logo.svg"/>
                <h3>Please Login</h3>
                <form>
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
                            <input type="checkbox"/>
                            <span className="checkmark" checked="checked">
                                <i className="fas fa-check"></i>
                            </span> Remember Me
                        </label>
                    </div>
                    <a href="#" className="btn btn-blue">LOG IN</a>
                    <p className="sub-text">Or if you have a beta key feel free to sign up <a href="./register.html">here</a>!</p>
                </form>
            </div>
            <div className="bg-right">
                <img src="../res/images/login.svg"/>
            </div>
        </div>
    )
}

export default Login;