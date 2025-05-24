import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import './Sidebar.css';
import LiveLinkLogo from '../assets/LiveLinkLogo.png';
import { ReactComponent as MyLinks1 } from '../assets/MyLinks1.svg';

const Sidebar = () => {
  const onClick = () => console.log("Button clicked") 
return (
  <>
    <div className="app-container">
      <nav className="sidebar">
        <img src={LiveLinkLogo} alt="Logo" />;
        <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>
          <MyLinks1 />
        </NavLink>
        <NavLink to="/friends" className={({ isActive }) => isActive ? 'active' : ''}>
          Friends
        </NavLink>
        <NavLink to="/discovery" className={({ isActive }) => isActive ? 'active' : ''}>
          Discovery
        </NavLink>
        <div className="bottomSidebar">
        <button className = 'addEvent' onClick = {onClick}>Add Event</button>
        <button className = 'profile' onClick = {onClick}><VscAccount /> Profile</button> 
        </div>
     
      </nav>
      
      <div className="main-content">
        <Outlet />
      </div>
      {/* <a href="#events">My Links</a>
      <a href="#friends">Friends and Community</a>
      <a href="#section">Discovery </a> */}
      </div>
  </>
 );
};

export default Sidebar;
