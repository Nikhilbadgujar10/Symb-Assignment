import { useState } from "react";

function AddOrder({ addOrder }) {
  const [form, setForm] = useState({
    restaurantName: "",
    itemCount: "",
    deliveryDistance: "",
    isPaid: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.restaurantName ||
      !form.itemCount ||
      form.deliveryDistance === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    if (Number(form.deliveryDistance) < 0) {
      alert("Distance cannot be negative");
      return;
    }

   
    if (Number(form.itemCount) <= 0) {
      alert("Item count must be greater than 0");
      return;
    }

    const newOrder = {
      orderId: Date.now().toString(),
      restaurantName: form.restaurantName,
      itemCount: Number(form.itemCount),
      deliveryDistance: Number(form.deliveryDistance),
      isPaid: form.isPaid
    };

    addOrder(newOrder);

    
    setForm({
      restaurantName: "",
      itemCount: "",
      deliveryDistance: "",
      isPaid: false
    });
  };

  return (
    <div className="card">
      <h2>Add Order</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={form.restaurantName}
          onChange={(e) =>
            setForm({ ...form, restaurantName: e.target.value })
          }
        />
        <input
          type="number"
          min="1"
          placeholder="Item Count"
          value={form.itemCount}
          onChange={(e) =>
            setForm({ ...form, itemCount: e.target.value })
          }
        />
        <input
          type="number"
          min="0"
          placeholder="Delivery Distance (km)"
          value={form.deliveryDistance}
          onChange={(e) =>
            setForm({ ...form, deliveryDistance: e.target.value })
          }
        />
        <label style={{ fontSize: "14px", fontWeight: "500" }}>
          Payment Status
        </label>
        <select
          value={form.isPaid}
          onChange={(e) =>
            setForm({
              ...form,
              isPaid: e.target.value === "true"
            })
          }
        >
          <option value="false">Unpaid</option>
          <option value="true">Paid</option>
        </select>

        <button type="submit">Add Order</button>
      </form>
    </div>
  );
}
export default AddOrder;