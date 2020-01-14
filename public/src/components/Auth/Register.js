import React from 'react';

const Register = ({SetActiveUser}) => {
    const Register = e => {
        e.preventDefault();

        const validate = {
            terms: document.getElementById('terms'),
            pwd: document.getElementById('password'),
            confPwd: document.getElementById('confirmPassword')
        }

        const alert = document.getElementById('alert');
        const alertTxt = document.getElementById('alert-text');

        if(validate.pwd.value !== validate.confPwd.value) {
            alertTxt.innerText = "Passwords dont match";
            alert.style.visibility = "visible";
            alert.style.opacity = "1";
            setTimeout(() => {
                alert.style.visibility = "hidden";
                alert.style.opacity = "0";
            }, 8000);
        } else if(!validate.terms.checked) {
            alertTxt.innerText = "You must agree to the terms of service";
            alert.style.visibility = "visible";
            alert.style.opacity = "1";
            setTimeout(() => {
                alert.style.visibility = "hidden";
                alert.style.opacity = "0";
            }, 8000);
        } else {
            const user = {email: e.target[0].value, firstName: e.target[1].value, lastName: e.target[2].value, username: e.target[3].value, password: e.target[4].value, betaKey: e.target[6].value,};
            fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                return res.json();
            }).then((res) => {
                if(res.success === true) {
                    SetActiveUser(res.payload);
                } else {
                    alertTxt.innerText = `[Server Error] ${res.message}`;
                    alert.style.visibility = "visible";
                    alert.style.opacity = "1";
                    setTimeout(() => {
                        alert.style.visibility = "hidden";
                        alert.style.opacity = "0";
                    }, 8000);
                }
            })
        }
    }
    const CloseAlert = e => {
        const alert = document.getElementById('alert');
        alert.style.opacity = '0';
        alert.style.visibility = 'hidden';
    }
    return (
        <div className="container auth">
            <div id="login" className="micro-form">
                <div className="alert" id="alert">
                    <span className="closebtn" onClick={CloseAlert}>&times;</span>
                    <span id="alert-text"></span>
                </div>
                <img className="logo" src="../res/images/logo.svg"/>
                <h3>Enter Your Information</h3>
                <form onSubmit={Register}>
                    <div className="input-group">
                        <input type="email" placeholder="Email" required/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="First Name" required/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Last Name" required/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Username" required/>
                        <i className="far fa-user"></i>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" id="password" required/>
                        <i className="fas fa-unlock-alt"></i>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Confirm Password" id="confirmPassword" required/>
                        <i className="fas fa-unlock-alt"></i>
                    </div>
                    <div className="flex">
                        <h3>BETA- </h3>
                        <div className="input-group">
                            <input type="text" placeholder="Beta Key" required/>
                            <i className="fas fa-key"></i>
                        </div>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" id="terms"/>
                            <span className="checkmark" checked="checked">
                                <i className="fas fa-check"></i>
                            </span> I agree to the&nbsp;<a href="#">Terms & Conditions</a>
                        </label>
                    </div>
                    <button type="submit" className="btn">REGISTER</button>
                </form>
            </div>
            <div className="bg-right">
                <img src="../res/images/login.svg"/>
            </div>
        </div>
    )
}

export default Register;