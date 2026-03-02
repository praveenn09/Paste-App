import React from 'react'
import { NavLink } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
  return (
    <div className='nav-head'>
      <NavLink 
  to="/" 
  className={({ isActive }) => isActive ? "active" : ""}
>
  Home
</NavLink>

<NavLink 
  to="/pastes"
  className={({ isActive }) => isActive ? "active" : ""}
>
  Paste
</NavLink>
    </div>
  )
}

export default NavBar
