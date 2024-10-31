import React from 'react'
import "./Header_user.css"
import { CiSearch } from "react-icons/ci";

function Header_user() {
  return (
    <div className='header_user'>
        <div className="search__container">
            <CiSearch className="search-icon" />
            <input 
            type="text" 
            className="Usersearch_bar"
            placeholder='search for something....'
            />
        </div>
        <div className="left__buttons">
           <CiSearch className="search-icon1" />
           <button className='add__button'>Add User</button>
        </div>
    </div>
  )
}

export default Header_user;