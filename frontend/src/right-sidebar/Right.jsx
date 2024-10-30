import React from "react";
import { CiSearch } from "react-icons/ci";
import "./right.css";

function Right() {
  return (
    <div className="right-sidebar">
      <div className="buttons-right-bar">
        <div className="search-rightbar-container">
          <CiSearch className="search-icon-rightbar" />
          <input
            type="text"
            placeholder="Search for something..."
            className="search-rightbar"
          />
        </div>
      </div>

      <div className="users-list">
        <h3>Top users</h3>
        <ul>
          <li>
            <img src="profile1.jpg" alt="User 1" /> Anzza Mustafa
          </li>
          <li>
            <img src="profile2.jpg" alt="User 2" /> Mike Patton
          </li>
          <li>
            <img src="profile2.jpg" alt="User 2" /> Pitter Poul
          </li>
        </ul>
      </div>
      <div className="users-list">
        <h3>Top workers</h3>
        <ul>
          <li>
            <img src="profile1.jpg" alt="User 1" /> Anzza Mustafa
          </li>
          <li>
            <img src="profile2.jpg" alt="User 2" /> Mike Patton
          </li>
          <li>
            <img src="profile2.jpg" alt="User 2" /> Pitter Poul
          </li>
        </ul>
      </div>
      <div className="users-list">
        <h3>Top Deliveries</h3>
        <ul>
          <li>
            <img src="profile1.jpg" alt="User 1" /> Anzza Mustafa
          </li>
          <li>
            <img src="profile2.jpg" alt="User 2" /> Mike Patton
          </li>
          <li>
            <img src="profile2.jpg" alt="User 2" /> Pitter Poul
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Right;
