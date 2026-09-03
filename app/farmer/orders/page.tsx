"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
        setError("Please login to view your orders.");
        setOrders([]);
        return;
      }

      const result = await getOrders(user.id, "buyer");

      setOrders(result.orders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }

  function getStatusStyle(status: string) {
    const currentStatus = String(status || "pending").toLowerCase();

    if (currentStatus === "accepted") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (currentStatus === "rejected") {
      return {
        background: "#fee2e2",
        color: "#991b1b",
      };
    }

    return {
      background: "#fef3c7",
      color: "#92400e",
    };
  }

  if (loading) {
    return (
      <main className="buyer-orders-page">
        <div className="container">
          <Link href="/buyer" className="back-button">
            ← Back to Marketplace
          </Link>

          <div className="loading-card">
            <div className="loading-icon">⏳</div>
            <h2>Loading your orders...</h2>
          </div>
        </div>

        <style jsx>{`
          .buyer-orders-page {
            min-height: 100vh;
            background: #f6f8f5;
            padding: 25px 16px 50px;
          }

          .container {
            max-width: 1000px;
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
            text-decoration: none;
          }

          .back-button:hover {
            background: #edf7ed;
            color: #1b5e20;
          }

          .loading-card {
            background: white;
            border: 1px solid #e1e6df;
            border-radius: 14px;
            padding: 50px 20px;
            text-align: center;
          }

          .loading-icon {
            font-size: 35px;
          }

          .loading-card h2 {
            color: #172019;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="buyer-orders-page">
      <div className="container">
        <Link href="/buyer" className="back-button">
          ← Back to Marketplace
        </Link>

        <header className="page-header">
          <div>
            <p className="eyebrow">BUYER PORTAL</p>
            <h1>My Orders</h1>
            <p className="subtitle">
              Track the status of your orders from farmers.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={loadOrders}
          >
            ↻ Refresh
          </button>
        </header>

        {error && (
          <div className="error-card">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="empty-card">
            <div className="empty-icon">📦</div>
            <h2>No orders yet</h2>
            <p>
              You haven't placed any orders yet.
            </p>

            <Link href="/buyer" className="shop-button">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const status = String(
                order.status || "pending"
              ).toLowerCase();

              const statusStyle = getStatusStyle(status);

              return (
                <div className="order-card" key={order.id}>
                  <div className="order-header">
                    <div>
                      <p className="order-label">ORDER</p>

                      <h2>
                        #{order.id.slice(0, 8)}
                      </h2>
                    </div>

                    <span
                      className="status-badge"
                      style={{
                        background: statusStyle.background,
                        color: statusStyle.color,
                      }}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="order-details">
                    <div className="detail">
                      <span>Product</span>
                      <strong>
                        {order.product_name ||
                          order.product_id ||
                          "Unknown Product"}
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
                        ₹{order.product_price ?? "N/A"}
                        {order.product_unit
                          ? ` / ${order.product_unit}`
                          : ""}
                      </strong>
                    </div>

                    <div className="detail">
                      <span>Total</span>
                      <strong className="total-price">
                        ₹{order.total_price}
                      </strong>
                    </div>

                    <div className="detail">
                      <span>Ordered On</span>
                      <strong>
                        {order.created_at
                          ? new Date(
                              order.created_at
                            ).toLocaleString()
                          : "N/A"}
                      </strong>
                    </div>
                  </div>

                  <div
                    className="status-message"
                    style={{
                      background:
                        statusStyle.background,
                      color: statusStyle.color,
                    }}
                  >
                    {status === "accepted" && (
                      <>
                        ✓ Your order has been accepted by
                        the farmer.
                      </>
                    )}

                    {status === "rejected" && (
                      <>
                        ✕ Your order has been rejected by
                        the farmer.
                      </>
                    )}

                    {status === "pending" && (
                      <>
                        ⏳ Your order is waiting for the
                        farmer's response.
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .buyer-orders-page {
          min-height: 100vh;
          background: #f6f8f5;
          padding: 25px 16px 60px;
        }

        .container {
          max-width: 1000px;
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
          text-decoration: none;
          transition: 0.2s ease;
        }

        .back-button:hover {
          background: #edf7ed;
          color: #1b5e20;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .eyebrow {
          margin: 0 0 5px;
          color: #2e7d32;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .page-header h1 {
          margin: 0;
          color: #172019;
          font-size: 34px;
        }

        .subtitle {
          margin: 8px 0 0;
          color: #68736b;
        }

        .refresh-button {
          padding: 11px 18px;
          border: none;
          border-radius: 9px;
          background: #2e7d32;
          color: white;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .refresh-button:hover {
          background: #1b5e20;
        }

        .error-card {
          margin-bottom: 20px;
          padding: 14px 16px;
          border-radius: 9px;
          background: #fee2e2;
          color: #991b1b;
          font-weight: 500;
        }

        .orders-list {
          display: grid;
          gap: 18px;
        }

        .order-card {
          padding: 22px;
          background: white;
          border: 1px solid #e1e6df;
          border-radius: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding-bottom: 18px;
          border-bottom: 1px solid #edf0ec;
        }

        .order-label {
          margin: 0 0 3px;
          color: #879087;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .order-header h2 {
          margin: 0;
          color: #172019;
          font-size: 21px;
        }

        .status-badge {
          padding: 7px 13px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          padding: 20px 0;
        }

        .detail {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .detail span {
          color: #7a837c;
          font-size: 12px;
        }

        .detail strong {
          color: #263128;
          font-size: 14px;
        }

        .detail .total-price {
          color: #2e7d32;
          font-size: 17px;
        }

        .status-message {
          padding: 13px 15px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 600;
        }

        .empty-card,
        .loading-card {
          padding: 50px 20px;
          background: white;
          border: 1px solid #e1e6df;
          border-radius: 15px;
          text-align: center;
        }

        .empty-icon,
        .loading-icon {
          font-size: 40px;
        }

        .empty-card h2 {
          margin: 12px 0 5px;
          color: #172019;
        }

        .empty-card p {
          margin: 0 0 20px;
          color: #68736b;
        }

        .shop-button {
          display: inline-flex;
          padding: 11px 18px;
          border-radius: 9px;
          background: #2e7d32;
          color: white;
          font-weight: 600;
          text-decoration: none;
        }

        .shop-button:hover {
          background: #1b5e20;
          color: white;
        }

        @media (max-width: 650px) {
          .buyer-orders-page {
            padding: 18px 12px 40px;
          }

          .back-button {
            width: 100%;
            justify-content: center;
            margin-bottom: 20px;
          }

          .page-header {
            flex-direction: column;
            align-items: stretch;
            margin-bottom: 22px;
          }

          .page-header h1 {
            font-size: 28px;
          }

          .refresh-button {
            width: 100%;
          }

          .order-card {
            padding: 17px;
          }

          .order-header {
            align-items: flex-start;
          }

          .order-header h2 {
            font-size: 18px;
          }

          .status-badge {
            font-size: 12px;
            padding: 6px 10px;
          }

          .order-details {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .status-message {
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}