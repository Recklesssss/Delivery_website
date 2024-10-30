import React from 'react';
import './middle.css';
import { FaSortDown } from 'react-icons/fa';

function Middle() {
  return (
    <div className="content-container">
      <div className="content">
         <div className="statics">
            <h4>STATISTICS</h4>
            <label>
              <input type="checkbox" /> Charts
            </label>
            <label>
              <input type="checkbox" /> Graphs
            </label>
            <label>
              <input type="checkbox" /> Diagrams
            </label>
         </div>
        <div className="statistics">
          <div className="top-tracks">
            <h2>Customer for the Past 30 Days</h2>
            <div className="track">
               <div className="title-container">
                  <p>FOR THE PAST 90 DAYS <FaSortDown /></p>
              </div>
              <hr />
              <div className="deliverer-pfp">
                  <img src="profile-picture.png" alt="Profile" />
                  <p>Deliverer Name</p>
                  <p>Status: Currently Active</p>
              </div>
              <div className="deliverer-pfp">
                  <img src="profile-picture.png" alt="Profile" />
                  <p>Deliverer Name</p>
                  <p>Status: Currently Active</p>
              </div>
            </div>
          </div>

          <div className="revenue-chart">
            <div className="chart-title">
               <h2>SELECTIVE REVENUE CHART</h2>
               <p>FOR THE PAST 90 DAYS <FaSortDown /></p>
            </div>
            <div id="chart">Chart here</div>
          </div>

          <div className="graph">
            <div className="graph-classification">
              <h3>Country</h3>
              <h3>Popularity</h3>
              <h3>Sales</h3>
              <h3>Trends</h3>
            </div>
            
            <div className="chart-title">
               <p>FOR THE PAST 90 DAYS <FaSortDown /></p>
            </div>
            <div id="chart">Chart here</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Middle;
