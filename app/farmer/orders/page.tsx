"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";

type OrderStatus = "pending" | "accepted" | "rejected";

type Order = {
  id: string;
  product_id: string;
  buyer_id: string;
  quantity: number;
  total_price: number;
  status: OrderStatus;
  created_at?: string;
  product_name?: string;
  product_price?: number;
  product_unit?: string;
};

export default function FarmerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Please login as a farmer.");
        setOrders([]);
        return;
      }

      const result = await getOrders(user.id, "farmer");

      console.log("Farmer orders:", result);

      setOrders(result.orders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(
    orderId: string,
    newStatus: "accepted" | "rejected"
  ) {
    try {
      setUpdating(orderId);
      setError("");

      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const result = await response.json();

      console.log("Update response:", result);

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to update order"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );
    } catch (error: any) {
      console.error("Update order error:", error);

      setError(
        error.message || "Failed to update order."
      );
    } finally {
      setUpdating(null);
    }
  }

  if (loading) {
    return (
      <main className="page">
        <div className="container">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="back-button"
          >
            ← Back to Dashboard
          </button>

          <div className="loading-card">
            <div className="loading-icon">📦</div>
            <h1>Farmer Orders</h1>
            <p>Loading orders...</p>
          </div>
        </div>

        <style jsx>{`
          .page {
            min-height: 100vh;
            padding: 30px 16px 60px;
            background: #f6f8f5;
          }

          .container {
            width: min(1000px, 100%);
            margin: 0 auto;
          }

          .back-button {
            display: inline-flex;
            align-items: center;
            padding: 10px 16px;
            margin-bottom: 25px;
            border: 1px solid #e1e6df;
            border-radius: 9px;
            background: white;
            color: #2e7d32;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
          }

          .back-button:hover {
            background: #edf7ed;
          }

          .loading-card {
            padding: 55px 20px;
            background: white;
            border: 1px solid #dfe5de;
            border-radius: 16px;
            text-align: center;
          }

          .loading-icon {
            font-size: 42px;
          }

          .loading-card h1 {
            margin: 12px 0 6px;
            color: #172019;
          }

          .loading-card p {
            margin: 0;
            color: #68736b;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => window.history.back()}
          className="back-button"
        >
          ← Back to Dashboard
        </button>

        {/* HEADER */}

        <div className="page-header">
          <div>
            <h1>Farmer Orders</h1>
            <p>
              Manage orders placed for your products.
            </p>
          </div>

          <button
            type="button"
            onClick={loadOrders}
            className="refresh-button"
          >
            ↻ Refresh
          </button>
        </div>

        {/* ERROR */}

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* EMPTY */}

        {orders.length === 0 ? (
          <div className="empty-card">
            <div className="empty-icon">📦</div>

            <h2>No orders yet</h2>

            <p>
              Orders placed for your products will
              appear here.
            </p>

            <button
              type="button"
              onClick={loadOrders}
              className="refresh-button"
            >
              Refresh Orders
            </button>
          </div>
        ) : (
          <>
            {/* ORDER COUNT */}

            <div className="orders-summary">
              <strong>
                {orders.length}{" "}
                {orders.length === 1
                  ? "Order"
                  : "Orders"}
              </strong>

              <span>
                {orders.filter(
                  (order) =>
                    order.status === "pending"
                ).length}{" "}
                pending
              </span>
            </div>

            {/* ORDERS */}

            <div className="orders-list">
              {orders.map((order) => {
                const status = String(
                  order.status || "pending"
                ).toLowerCase() as OrderStatus;

                const isUpdating =
                  updating === order.id;

                return (
                  <article
                    key={order.id}
                    className="order-card"
                  >

                    {/* ORDER HEADER */}

                    <div className="order-header">
                      <div>
                        <h2>
                          Order #
                          {order.id.slice(0, 8)}
                        </h2>

                        {order.created_at && (
                          <p className="date">
                            {new Date(
                              order.created_at
                            ).toLocaleString()}
                          </p>
                        )}
                      </div>

                      <span
                        className={`status ${status}`}
                      >
                        {status}
                      </span>
                    </div>

                    {/* PRODUCT */}

                    <div className="product-section">
                      <div className="product-icon">
                        🌾
                      </div>

                      <div>
                        <span className="label">
                          Product
                        </span>

                        <strong>
                          {order.product_name ||
                            order.product_id}
                        </strong>
                      </div>
                    </div>

                    {/* DETAILS */}

                    <div className="details-grid">

                      <div className="detail">
                        <span>Buyer ID</span>
                        <strong className="buyer-id">
                          {order.buyer_id || "N/A"}
                        </strong>
                      </div>

                      <div className="detail">
                        <span>Quantity</span>

                        <strong>
                          {order.quantity}{" "}
                          {order.product_unit || ""}
                        </strong>
                      </div>

                      <div className="detail">
                        <span>Price</span>

                        <strong>
                          ₹
                          {order.product_price ??
                            "N/A"}
                        </strong>
                      </div>

                      <div className="detail">
                        <span>Total</span>

                        <strong className="total-price">
                          ₹{order.total_price}
                        </strong>
                      </div>

                    </div>

                    {/* ACTIONS */}

                    {status === "pending" && (
                      <div className="actions">

                        <button
                          type="button"
                          className="accept-button"
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "accepted"
                            )
                          }
                          disabled={isUpdating}
                        >
                          {isUpdating
                            ? "Updating..."
                            : "✓ Accept Order"}
                        </button>

                        <button
                          type="button"
                          className="reject-button"
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "rejected"
                            )
                          }
                          disabled={isUpdating}
                        >
                          {isUpdating
                            ? "Updating..."
                            : "✕ Reject Order"}
                        </button>

                      </div>
                    )}

                    {/* ACCEPTED */}

                    {status === "accepted" && (
                      <div className="accepted-message">
                        ✓ This order has been accepted.
                      </div>
                    )}

                    {/* REJECTED */}

                    {status === "rejected" && (
                      <div className="rejected-message">
                        ✕ This order has been rejected.
                      </div>
                    )}

                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 30px 16px 60px;
          background: #f6f8f5;
        }

        .container {
          width: min(1000px, 100%);
          margin: 0 auto;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          margin-bottom: 25px;
          border: 1px solid #e1e6df;
          border-radius: 9px;
          background: white;
          color: #2e7d32;
          font-weight: 600;
          font-size: 15px;
          font-family: inherit;
          cursor: pointer;
        }

        .back-button:hover {
          background: #edf7ed;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .page-header h1 {
          margin: 0 0 6px;
          color: #172019;
          font-size: 36px;
        }

        .page-header p {
          margin: 0;
          color: #68736b;
          font-size: 16px;
        }

        .refresh-button {
          padding: 10px 17px;
          border: 1px solid #cbd7ca;
          border-radius: 9px;
          background: white;
          color: #2e7d32;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
        }

        .refresh-button:hover {
          background: #edf7ed;
        }

        .error-message {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 25px;
          padding: 14px 16px;
          border: 1px solid #fecaca;
          border-radius: 10px;
          background: #fee2e2;
          color: #991b1b;
          font-weight: 600;
        }

        .orders-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          padding: 14px 18px;
          border: 1px solid #dfe5de;
          border-radius: 10px;
          background: white;
        }

        .orders-summary strong {
          color: #172019;
        }

        .orders-summary span {
          color: #92400e;
          font-weight: 600;
        }

        .orders-list {
          display: grid;
          gap: 20px;
        }

        .order-card {
          padding: 23px;
          border: 1px solid #dfe5de;
          border-radius: 16px;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 22px;
          padding-bottom: 18px;
          border-bottom: 1px solid #e7ebe6;
        }

        .order-header h2 {
          margin: 0;
          color: #172019;
          font-size: 20px;
        }

        .date {
          margin: 5px 0 0;
          color: #68736b;
          font-size: 13px;
        }

        .status {
          padding: 7px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .status.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status.accepted {
          background: #d1fae5;
          color: #065f46;
        }

        .status.rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .product-section {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .product-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #edf7ed;
          font-size: 25px;
        }

        .label {
          display: block;
          margin-bottom: 4px;
          color: #68736b;
          font-size: 13px;
        }

        .product-section strong {
          color: #172019;
          font-size: 20px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        .detail {
          min-width: 0;
          padding: 13px;
          border-radius: 10px;
          background: #f6f8f5;
        }

        .detail span {
          display: block;
          margin-bottom: 5px;
          color: #68736b;
          font-size: 12px;
        }

        .detail strong {
          display: block;
          color: #172019;
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .detail .buyer-id {
          font-size: 12px;
        }

        .detail .total-price {
          color: #2e7d32;
          font-size: 18px;
        }

        .actions {
          display: flex;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid #e7ebe6;
        }

        .accept-button,
        .reject-button {
          padding: 11px 22px;
          border: none;
          border-radius: 8px;
          color: white;
          font-family: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .accept-button {
          background: #16a34a;
        }

        .accept-button:hover {
          background: #15803d;
        }

        .reject-button {
          background: #dc2626;
        }

        .reject-button:hover {
          background: #b91c1c;
        }

        .accept-button:disabled,
        .reject-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .accepted-message,
        .rejected-message {
          margin-top: 18px;
          padding: 12px 14px;
          border-radius: 9px;
          font-weight: 700;
        }

        .accepted-message {
          background: #ecfdf5;
          color: #065f46;
        }

        .rejected-message {
          background: #fef2f2;
          color: #991b1b;
        }

        .empty-card {
          padding: 60px 20px;
          border: 1px solid #dfe5de;
          border-radius: 16px;
          background: white;
          text-align: center;
        }

        .empty-icon {
          font-size: 45px;
        }

        .empty-card h2 {
          margin: 12px 0 7px;
          color: #172019;
        }

        .empty-card p {
          margin: 0 0 20px;
          color: #68736b;
        }

        @media (max-width: 750px) {
          .details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .page {
            padding: 20px 12px 40px;
          }

          .page-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .page-header h1 {
            font-size: 30px;
          }

          .order-card {
            padding: 18px;
          }

          .order-header {
            flex-direction: column;
          }

          .details-grid {
            grid-template-columns: 1fr 1fr;
          }

          .actions {
            flex-direction: column;
          }

          .accept-button,
          .reject-button {
            width: 100%;
          }
        }

        @media (max-width: 400px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}