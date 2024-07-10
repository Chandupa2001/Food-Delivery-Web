import React, { Profiler, useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({setShowLogin}) => {

    const [menu, SetMenu] = useState("home");
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>SetMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>SetMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
            <a href='#footer' onClick={()=>SetMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <FaSearch size={20} color='#49557e'/>
            <div className="navbar-search-icon">
                <Link to={'/cart'}><FaCartPlus size={20} color='#49557e'/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)} >Sign In</button>
            : <div className="navbar-profile">
                <MdAccountCircle size={25} color='#49557e' />
                <ul className="navbar-profile-dropdown">
                    <li><HiOutlineShoppingBag size={20} color='tomato' /> <p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><IoIosLogOut size={20} color='tomato' /><p>Logout</p></li>
                </ul>
            </div> }
            
        </div>
    </div>
  )
}

export default Navbar