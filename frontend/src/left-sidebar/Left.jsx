import React from 'react'
import "./left.css"
import { FaSortDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Left() {
  return (
   <div class="sidebar">
      <div className="logo">
         <h3><span>F</span>idel</h3>
      </div>
   <div className="watch-list">
         <div className="parag">
         <p>Overviews</p>
         </div>
      <ul class="menu">
         <Link to="/addUser">
            <li><a href="#">User</a></li>
         </Link>
         <Link to={"/addrestaurant"}>
            <li><a href="#">Restaurant</a></li>
         </Link>
         <li><a href="#">Delivery management</a></li>
         <li><a href="#">Statistics</a></li>
      </ul>
   </div>
   <div class="playlist">
      <div className="parag2">
         <p>My Watchlist</p>
      </div>
      <div class="playlist-item">
      <ul class="menu">
         <li><a href="#">User</a></li>
         <li><a href="#">Worker</a></li>
         <li><a href="#">Admin</a></li>
      </ul>
         <div className="statics-img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJVi4pS63dlSZnl1s0Qqk5iak0kF5Imar8w&s" alt="" />
         </div>
      </div>
      
   </div>
   <div className='News'>
      <div className="parag3">
            <p>My Watchlist</p>
         </div>
      <ul className='menu'>
         <li><a href="#">
            outstanding employee of the Week 
            <button className="button"><FaSortDown /></button>
            </a>
         </li>
         <li><a href="#">
            outstanding employee of the Month 
            <button className="button"><FaSortDown /></button>
            </a>
         </li>
         <li><a href="#">
            outstanding employee of the Year 
            <button className="button"><FaSortDown /></button>
            </a>
         </li>
      </ul>
   </div>
</div>

  )
}

export default Left;