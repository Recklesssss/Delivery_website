import React from 'react';
import './header.css';
import { SiTinyletter } from 'react-icons/si';
import { HiAdjustments } from 'react-icons/hi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { LuArchiveRestore } from 'react-icons/lu';
import { FaSortDown } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";

function Header() {
  return (
    <div className='header'>
      <div className="buttons">
      <div className="search-bar-container">
      <CiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search for something..."
        className="search-bar"
      />
    </div>
      </div>    
      <div className="user-profile">
        <div className="icons">
          <div className='icon'><HiAdjustments /></div>
          <div className='icon'><SiTinyletter /></div>
          <div className='icon'><IoShareSocialOutline /></div>
          <div className='icon'><LuArchiveRestore /></div>
        </div>
        <span><FaSortDown /> Username</span>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtWP9u3mLrRCgaKP2ebDPjemKKqxzMRHyG2SBu8b_7FTLHV3HOVufccszg0beG5SvDmqo&usqp=CAU" 
          alt="User Profile" 
        />
      </div>
    </div>
  );
}

export default Header;
