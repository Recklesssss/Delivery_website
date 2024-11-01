import React from 'react'
import "./Main_user.css"

function Main_user() {
  return (
    <div className='main_user'>
        <div className="form__container">
            <div className="header__user">
                <h1>Add New Users</h1>
            </div>
            <div className="user_name">
                <div className="first__name">
                    <span className='span'>First Name</span>
                    <input className="user_name" type="text" />
                </div>
                <div className="Last__name">
                    <span className='span'>Last Name</span>
                    <input className="user_name" type="text"/>
                </div>
            </div>
            <div className="user__address">
                <span>Address</span>
                <input className= "address"type="text" />
            </div>
            <div className="other__info">
                <div className="division1">
                    <label>Email Address</label>
                    <input type="text"/>
                </div>
                <div className="division2">
                    <label>Phone Number</label>
                    <input type="text"/>
                </div>
                <div className="division3">
                    <label>Role</label>
                    <input type="text"/>
                </div>
                <div className="division4">
                    <label>Password</label>
                    <input type="link"/>
                </div>
            </div>
            <div className="main__buttons">
                <button>Save</button>
                <button>Save & Add Another</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Main_user