import React from 'react';

const Register = () => {
    console.log('1')
    return (
        <div className="container auth">
            <div id="login" className="micro-form">
                <img className="logo" src="../res/images/logo.svg"/>
                <h3>Enter Your Information</h3>
                <form>
                    <div className="input-group">
                        <input type="text" placeholder="Email"/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="First Name"/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Last Name"/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Username"/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password"/>
                        <i className="fas fa-unlock-alt"></i>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Confirm Password"/>
                        <i className="fas fa-unlock-alt"></i>
                    </div>
                    <div className="flex">
                        <h3>BETA- </h3>
                        <div className="input-group">
                            <input type="text" placeholder="Beta Key"/>
                            <i className="fas fa-key"></i>
                        </div>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox"/>
                            <span className="checkmark" checked="checked">
                                <i className="fas fa-check"></i>
                            </span> I agree to the&nbsp;<a href="#">Terms & Conditions</a>
                        </label>
                    </div>
                    <a href="#" className="btn btn-blue">REGISTER</a>
                </form>
            </div>
            <div className="bg-right">
                <img src="../res/images/login.svg"/>
            </div>
        </div>
    )
}

export default Register;