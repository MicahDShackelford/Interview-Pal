import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = ({ActiveUser}) => {
  return (
    <div className="sidebar">
      <div className="logo">
          <img src="./res/images/logo.svg"/>
          <p>Interview <span className="bold">Pal</span></p>
      </div>
      <div className="flex user-info">
          <img className="avatar-sm" src={ActiveUser.profilePicture}/>
          <div className="text">
              <h4>{ActiveUser.firstName}</h4>
              <p>User</p>
          </div>
          <NavLink className="user-pref" to="#">
              <i className="fas fa-user-cog"></i>
          </NavLink>
      </div>
      <div className="navigation">
          <NavLink className="nav-item" activeClassName="active" to="/dashboard">
              <i className="fas fa-home"></i>
              Dashboard
          </NavLink>
          <NavLink className="nav-item" activeClassName="active" to="/profile">
              <i className="fas fa-user-circle"></i>
              Profile
          </NavLink>
          <NavLink className="nav-item" activeClassName="active" to="/calendar">
              <i className="far fa-calendar-alt"></i>
              Calendar
          </NavLink>
          {/* <NavLink className="nav-item" activeClassName="active" to="/interviews">
              <i className="far fa-calendar-check"></i>
              Interviews
          </NavLink> */}
          <NavLink className="nav-item" activeClassName="active" to="/notes">
              <i className="far fa-sticky-note"></i>
              Notes
          </NavLink>
          {/* <NavLink className="nav-item" activeClassName="active" to="/about">
              <i className="fas fa-info"></i>
              About
          </NavLink> */}
          {/* <NavLink className="nav-item" activeClassName="active" to="/support">
              <i className="far fa-question-circle"></i>
              Support
          </NavLink> */}
      </div>
    </div>
  )
}

export default Navigation;