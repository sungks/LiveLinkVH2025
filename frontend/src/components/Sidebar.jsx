import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import './Sidebar.css';

const Sidebar = () => {
  const onClick = () => console.log("Button clicked") 
return (
  <>
    <div className = "sidebar">
      <h1>LiveLink</h1>
      <nav className="sidebar-nav">
          <NavLink to="/events" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="link-text">My Links</span>
          </NavLink>
          
          <NavLink to="/friends" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="link-text">Friends and Community</span>
          </NavLink>
          
          <NavLink to="/section" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="link-text">Discovery</span>
          </NavLink>
        </nav>
      <a href="#events">My Links</a>
      <a href="#friends">Friends and Community</a>
      <a href="#section">Discovery </a>
      <div className="bottomSidebar">
        <button className = 'addEvent' onClick = {onClick}>Add Event</button>
        <button className = 'profile' onClick = {onClick}><VscAccount /> Profile</button> 
      </div>
    </div>
  </>
 );
};

export default Sidebar;
