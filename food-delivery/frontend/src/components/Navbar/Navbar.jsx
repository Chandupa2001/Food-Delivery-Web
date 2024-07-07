import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

    const [menu, SetMenu] = useState("home");

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>SetMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>SetMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
            <a href='#footer' onClick={()=>SetMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <FaSearch size={20} color='#49557e'/>
            <div className="navbar-search-icon">
                <FaCartPlus size={20} color='#49557e'/>
                <div className="dot"></div>
            </div>
            <button onClick={()=>setShowLogin(true)} >Sign In</button>
        </div>
    </div>
  )
}

export default Navbar