"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  getOrders,
  getAdminSummary,
} from "@/lib/api-client";

export default function TestApiPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const productsResult = await getProducts();
        const ordersResult = await getOrders();
        const summaryResult = await getAdminSummary();

        setProducts(productsResult.products || []);
        setOrders(ordersResult.orders || []);
        setSummary(summaryResult.summary);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          <p>
            Quantity: {product.quantity} {product.unit}
          </p>
        </div>
      ))}

      <hr />

      <h1>Orders</h1>

      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Product ID: {order.product_id}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Total Price: ₹{order.total_price}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}

      <hr />

      <h1>Admin Summary</h1>

      <p>Total Products: {summary?.total_products}</p>
      <p>Total Orders: {summary?.total_orders}</p>
      <p>Total Revenue: ₹{summary?.total_revenue}</p>
    </div>
  );
}