"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/api-client";

export default function FarmerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const result = await getOrders();
        setOrders(result.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return <main>Loading orders...</main>;
  }

  return (
    <main>
      <h1>Farmer Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h2>Order</h2>

            <p>Order ID: {order.id}</p>
            <p>Product ID: {order.product_id}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: ₹{order.total_price}</p>
            <p>Status: {order.status}</p>

            <hr />
          </div>
        ))
      )}
    </main>
  );
}