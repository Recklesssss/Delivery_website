import React, { useState } from "react";
import "./Main_user.css";
import axios from "axios";

function Main_user() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("http://localhost:3065/addUsers", {
        firstName:firstName,
        lastName:lastName,
        email:email,
        role:role,
        password:password,
        address:address,
        phone:phone,
      });
      console.log("User added:", response.data);
      // Clear fields after successful submission
      clearFields();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
    setPassword("");
    setAddress("");
    setPhone("");
  };

  const handleSaveAndAddAnother = async (e) => {
    e.preventDefault(); // Prevent default form submission
    await handleSubmit(e); 
    // Clear fields to prepare for another entry
    clearFields();
  };

  const handleCancel = () => {
    clearFields();
  };

  return (
    <div className="main_user">
      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <div className="header__user">
            <h1>Add New Users</h1>
          </div>
          <div className="user_name">
            <div className="first__name">
              <span className="span">First Name</span>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="user_name"
                type="text"
                required
              />
            </div>
            <div className="Last__name">
              <span className="span">Last Name</span>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="user_name"
                type="text"
                required
              />
            </div>
          </div>
          <div className="user__address">
            <span>Address</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="address"
              type="text"
              required
            />
          </div>
          <div className="other__info">
            <div className="division1">
              <label>Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div className="division2">
              <label>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                required
              />
            </div>
            <div className="division3">
              <label>Role</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                type="text"
              />
            </div>
            <div className="division4">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
          </div>
          <div className="main__buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={handleSaveAndAddAnother}>
              Save & Add Another
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Main_user;
