import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./Main__order.css"

const Main__order = () => {
  const [orders, setOrders] = useState([]);
  const [grandTotal,setGrandTotal] = useState(0);
  const [deliveries, setDeliveries] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Fetch orders and deliveries from API
  useEffect(() => {
    fetchOrders();
    // fetchDeliveries();
  }, []);

  const fetchOrders = async () => {
    // Fetch orders from API
    try {
      const response = await axios.get('http://localhost:3065/getOrderData?user_id=1');
      console.log("API Response:", response.data);
      setOrders(response.data.orders);
      setGrandTotal(response.data.grandTotal)
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  };

  // const fetchDeliveries = async () => {
  //   // Fetch deliveries from API
  //   const data = await fetch('/api/deliveries').then(res => res.json());
  //   setDeliveries(data);
  // };

  // const updateOrderStatus = async (orderId, status) => {
  //   // Update order status
  //   await fetch(`/api/orders/${orderId}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ status })
  //   });
  //   fetchOrders(); // Refresh orders
  // };

  // const assignDelivery = async (orderId, driverId) => {
  //   // Assign delivery personnel
  //   await fetch(`/api/orders/${orderId}/assign`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ driverId })
  //   });
  //   fetchDeliveries(); // Refresh deliveries
  // };

  return (
    <div className='main__order'>
      <h1>Order and Delivery Management</h1>
      
      <section>
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.order_id}</td>
                <td>{order.user_id}</td>
                <td>{order.food_quantity}</td>
                <td>{grandTotal}</td>
                <td>{order.status}</td>
                {/* <td>
                  <button onClick={() => updateOrderStatus(order.id, 'Completed')}>Mark as Completed</button>
                  <button onClick={() => setSelectedOrder(order)}>Assign Delivery</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedOrder && (
        <section>
          <h2>Assign Delivery Personnel</h2>
          {/* <select onChange={(e) => assignDelivery(selectedOrder.id, e.target.value)}>
            <option>Select Driver</option>
            {deliveries.map(driver => (
              <option key={driver.id} value={driver.id}>{driver.name}</option>
            ))}
          </select> */}
        </section>
      )}
    </div>
  );
};

export default Main__order;
