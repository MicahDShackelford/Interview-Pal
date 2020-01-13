import React from 'react';

const TopBar = ({ActiveUser, Logout}) => {
    return (
        <div className="flex top-bar">
            <div className="flex search-group">
                <div className="input-group">
                    <input type="text" placeholder="Search for Users (Email or Username)"/>
                    <i className="fas fa-search"></i>
                </div>
                <button className="btn" id="search">Search</button>
            </div>
            <div className="flex" id="account">
                <i className="fas fa-user-circle"></i>
                <p className="m-0 p-0">{ActiveUser.username}</p>
                <i className="fas fa-chevron-down"></i>
                <div id="account-dropdown">
                    <div className="flex column">
                        <a href="#" onClick={Logout}>Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar;