function OrderList({ orders }) {
  return (
    <div className="card">
      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Restaurant</th>
              <th>Items</th>
              <th>Distance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.restaurantName}</td>
                <td>{order.itemCount}</td>
                <td>{order.deliveryDistance} km</td>
                <td>
                  {order.isPaid ? (
                    <span className="status-paid">Paid</span>
                  ) : (
                    <span className="status-unpaid">Unpaid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderList;