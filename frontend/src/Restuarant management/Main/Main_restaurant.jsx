import React, { useState } from "react";
import axios from "axios";
import "./Main_restaurant.css";

function MainRestaurant() {
  const [restaurantName, setRestaurantName] = useState("");
  const [updatedRestaurant, setUpdatedRestaurant] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [update, setUpdate] = useState(false);

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3065/AddRestaurant", {
        restaurant: restaurantName,
        phone:phone,
        address:address,
      });
      alert("Restaurant added successfully!");
      clearFields();
    } catch (error) {
      console.error("Error Adding Restaurant:", error);
      alert("Failed to add restaurant.");
    }
  };

  const handleUpdateRestaurant = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:3065/UpdateRestaurant", {
        restaurant: restaurantName,
        updatedRestaurant,
        updatedPhone: phone,
        updatedAddress: address,
      });
      alert(response.data.message);
      clearFields();
    } catch (error) {
      console.error("Error Updating Restaurant:", error);
      alert("Failed to update restaurant.");
    }
  };

  const clearFields = () => {
    setRestaurantName("");
    setUpdatedRestaurant("");
    setAddress("");
    setPhone("");
    setUpdate(false);
  };

  return (
    <div className="main_user">
      <div className="form__container">
        <form onSubmit={update ? handleUpdateRestaurant : handleAddRestaurant}>
          <div className="header__user">
            <h1>{update ? "Update Restaurant" : "Add New Restaurant"}</h1>
          </div>
          <div className="restaurant_name">
            <span>Restaurant Name</span>
            <input
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              type="text"
              required
            />
          </div>
          {update && (
            <div className="updatedRestaurant">
              <span>Updated Restaurant Name</span>
              <input
                value={updatedRestaurant}
                onChange={(e) => setUpdatedRestaurant(e.target.value)}
                type="text"
                required
              />
            </div>
          )}
          <div className="user__address">
            <span>Address</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className="other__info">
            <label>Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className="main__buttons">
            <button type="submit">{update ? "Update" : "Save"}</button>
            <button type="button" onClick={() => setUpdate(true)}>
              Update Restaurant
            </button>
            <button type="button" onClick={clearFields}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MainRestaurant;
