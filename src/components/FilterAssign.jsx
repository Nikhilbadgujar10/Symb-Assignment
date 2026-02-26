import { useState } from "react";

function FilterAssign({ filterOrders, assignDelivery }) {
  const [status, setStatus] = useState("all");
  const [maxDistance, setMaxDistance] = useState("");

  return (
    <div className="card">
      <h2>Filter & Assign</h2>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">All</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>

      <input
        type="number"
        placeholder="Max Distance"
        value={maxDistance}
        onChange={(e) => setMaxDistance(e.target.value)}
      />

      <button
        onClick={() => filterOrders(status, Number(maxDistance))}
      >
        Apply Filter
      </button>

      <button
        onClick={() =>
          assignDelivery(Number(maxDistance || Infinity))
        }
      >
        Assign Nearest Unpaid
      </button>
    </div>
  );
}

export default FilterAssign;