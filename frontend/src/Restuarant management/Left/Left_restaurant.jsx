import React from 'react'
import "./Left_restaurant.css"
import { TfiDashboard } from "react-icons/tfi";
import { FaInbox } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Left_restaurant() {
  return (
    <div className='left_user'>
        <div className="admin_profile">
            <img className = "admin_pfp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXHyqEEcIEQzggUF5RIBe8g37M9n1guqKhg&s" alt="" />
            <p>Admin name</p>
        </div>
        <div className="admin__buttons">
            <ul>
                <Link to={"/"}>
                  <li><TfiDashboard className='admin_icons'/> Dashboard</li>
                </Link>
                <li><FaInbox className='admin_icons'/>inbox</li>
                <li><IoSettingsOutline className='admin_icons'/>setting</li>
            </ul>
        </div>
    </div>
  )
}

export default Left_restaurant