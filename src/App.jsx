import { useEffect, useState } from "react";
import AddOrder from "./components/AddOrder";
import FilterAssign from "./components/FilterAssign";
import OrderList from "./components/OrderList";
function App() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [message, setMessage] = useState("");
   useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);
  const addOrder = (order) => {
    setOrders(prev => [...prev, order]);
  };
const filterOrders = (status, maxDistance) => {
    let data = [...orders];

    if (status !== "all") {
      const paidStatus = status === "paid";
      data = data.filter(o => o.isPaid === paidStatus);
    }
if (maxDistance) {
      data = data.filter(o => o.deliveryDistance <= maxDistance);
    }
setFilteredOrders(data);
  };
  const assignDelivery = (maxDistance) => {
    const eligible = orders
      .filter(o => !o.isPaid && o.deliveryDistance <= maxDistance)
      .sort((a, b) => a.deliveryDistance - b.deliveryDistance);
if (eligible.length === 0) {
      setMessage("No order available");
      return;
    }
const assigned = eligible[0];
 setOrders(prev =>
      prev.map(o =>
        o.orderId === assigned.orderId
          ? { ...o, isPaid: true }
          : o
      )
    );
 setMessage(`Assigned Order ID: ${assigned.orderId}`);
  };
 return (
    <div className="container">
      <div className="header">
        <div className="burger-icon">
  <span></span>
</div>
        <h1>Food Delivery Order Manager</h1>
      </div>

      <AddOrder addOrder={addOrder} />

      <FilterAssign
        filterOrders={filterOrders}
        assignDelivery={assignDelivery}
      />

      <OrderList orders={filteredOrders} />

      <div className="card">
        <h2>Output</h2>
        <p className="output-text">{message}</p>
      </div>
    </div>
  );
}

export default App;