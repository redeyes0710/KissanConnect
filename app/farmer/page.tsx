"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createProduct, getProducts } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";

export default function FarmerPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");

  const [products, setProducts] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editUnit, setEditUnit] = useState("kg");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setProductsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProducts([]);
        return;
      }

      const result = await getProducts();

      const farmerProducts = (result.products || []).filter(
        (product: any) => product.farmer_id === user.id
      );

      setProducts(farmerProducts);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setProductsLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("You must be logged in to create a listing.");
        return;
      }

      const result = await createProduct({
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        unit,
        farmer_id: user.id,
      });

      if (result.success) {
        setMessage("Product listed successfully! ✅");

        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setUnit("kg");

        await loadProducts();
      } else {
        setMessage(result.error || "Failed to create product.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function startEditing(product: any) {
    setEditingId(product.id);
    setEditName(product.name || "");
    setEditDescription(product.description || "");
    setEditPrice(String(product.price ?? ""));
    setEditQuantity(String(product.quantity ?? ""));
    setEditUnit(product.unit || "kg");
  }

  function cancelEditing() {
    setEditingId(null);
  }

  async function saveEdit(productId: string) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
          price: Number(editPrice),
          quantity: Number(editQuantity),
          unit: editUnit,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update product");
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? result.product : product
        )
      );

      setEditingId(null);
      setMessage("Product updated successfully! ✅");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update product.");
    }
  }

  async function deleteProduct(productId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete product");
      }

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );

      setMessage("Product deleted successfully! ✅");
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete product.");
    }
  }

  return (
    <main className="farmer-page">
      {/* BACK BUTTON */}
      <Link href="/" className="back-link">
        ← Back
      </Link>

      {/* HEADER */}
      <section className="farmer-header">
        <div>
          <p className="eyebrow">FARMER PORTAL</p>
          <h1>Farmer Dashboard</h1>
          <p className="subtitle">
            Manage your produce, listings and orders in one place.
          </p>
        </div>

        <Link href="/farmer/orders" className="orders-link">
          📦 View Orders
        </Link>
      </section>

      {/* QUICK STATS */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🥬</div>
          <div>
            <span>My Products</span>
            <strong>{products.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div>
            <span>Available Listings</span>
            <strong>{products.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌱</div>
          <div>
            <span>Marketplace</span>
            <strong>Active</strong>
          </div>
        </div>
      </section>

      {/* CREATE PRODUCT */}
      <section className="dashboard-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LIST PRODUCE</p>
            <h2>Add New Product</h2>
          </div>
          <span className="section-icon">＋</span>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tomato"
                required
              />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="40"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="100"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="quintal">Quintal</option>
                <option value="ton">Ton</option>
                <option value="piece">Piece</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product, quality, harvest details, etc."
              rows={4}
            />
          </div>

          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? "Creating..." : "＋ Create Listing"}
          </button>
        </form>

        {message && (
          <div className="message">
            {message}
          </div>
        )}
      </section>

      {/* PRODUCTS */}
      <section className="products-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR INVENTORY</p>
            <h2>My Products</h2>
          </div>

          <span className="product-count">
            {products.length} listing{products.length !== 1 ? "s" : ""}
          </span>
        </div>

        {productsLoading ? (
          <div className="empty-card">
            <div className="loading-icon">⏳</div>
            <p>Loading your products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-card">
            <div className="empty-icon">🌾</div>
            <h3>No products yet</h3>
            <p>
              Add your first product listing using the form above.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                {editingId === product.id ? (
                  <div className="edit-area">
                    <div className="edit-header">
                      <h3>Edit Product</h3>
                      <button
                        type="button"
                        className="close-btn"
                        onClick={cancelEditing}
                      >
                        ×
                      </button>
                    </div>

                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                        rows={3}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) =>
                            setEditPrice(e.target.value)
                          }
                          min="0"
                        />
                      </div>

                      <div className="form-group">
                        <label>Quantity</label>
                        <input
                          type="number"
                          value={editQuantity}
                          onChange={(e) =>
                            setEditQuantity(e.target.value)
                          }
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Unit</label>
                      <select
                        value={editUnit}
                        onChange={(e) => setEditUnit(e.target.value)}
                      >
                        <option value="kg">kg</option>
                        <option value="quintal">quintal</option>
                        <option value="ton">ton</option>
                        <option value="piece">piece</option>
                      </select>
                    </div>

                    <div className="edit-buttons">
                      <button
                        type="button"
                        className="primary-btn"
                        onClick={() => saveEdit(product.id)}
                      >
                        Save Changes
                      </button>

                      <button
                        type="button"
                        className="secondary-btn"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="product-top">
                      <div className="product-emoji">🥕</div>

                      <span className="active-badge">
                        Active
                      </span>
                    </div>

                    <h3>{product.name}</h3>

                    {product.description && (
                      <p className="product-description">
                        {product.description}
                      </p>
                    )}

                    <div className="product-price">
                      ₹{product.price}
                      <span> / {product.unit}</span>
                    </div>

                    <div className="quantity-box">
                      <span>Available quantity</span>
                      <strong>
                        {product.quantity} {product.unit}
                      </strong>
                    </div>

                    <div className="product-actions">
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() => startEditing(product)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => deleteProduct(product.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ORDERS CTA */}
      <section className="orders-card">
        <div>
          <p className="eyebrow">ORDERS</p>
          <h2>Manage Buyer Orders</h2>
          <p>
            Review incoming orders and accept or reject pending requests.
          </p>
        </div>

        <Link href="/farmer/orders" className="primary-link">
          Go to Orders →
        </Link>
      </section>

      <style jsx>{`
        .farmer-page {
          min-height: 100vh;
          padding: 32px 20px 60px;
          background: #f6f8f5;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          margin: 0 auto 20px;
          max-width: 1100px;
          padding: 10px 16px;
          border: 1px solid #e1e6df;
          border-radius: 9px;
          background: white;
          color: #2e7d32;
          font-weight: 600;
          text-decoration: none;
        }

        .back-link:hover {
          background: #edf7ed;
          color: #1b5e20;
        }

        .farmer-header {
          max-width: 1100px;
          margin: 0 auto 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .eyebrow {
          margin: 0 0 5px;
          color: #2e7d32;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .farmer-header h1 {
          margin: 0;
          font-size: 34px;
          color: #172019;
        }

        .subtitle {
          margin: 8px 0 0;
          color: #68736b;
        }

        .orders-link,
        .primary-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 18px;
          border-radius: 9px;
          background: #2e7d32;
          color: white;
          font-weight: 600;
          text-decoration: none;
        }

        .orders-link:hover,
        .primary-link:hover {
          background: #1b5e20;
          color: white;
        }

        .stats-grid {
          max-width: 1100px;
          margin: 0 auto 28px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px;
          background: white;
          border: 1px solid #e1e6df;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .stat-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #edf7ed;
          font-size: 23px;
        }

        .stat-card span {
          display: block;
          color: #68736b;
          font-size: 13px;
        }

        .stat-card strong {
          display: block;
          margin-top: 3px;
          color: #172019;
          font-size: 22px;
        }

        .dashboard-card,
        .products-section,
        .orders-card {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }

        .dashboard-card {
          padding: 26px;
          background: white;
          border: 1px solid #e1e6df;
          border-radius: 16px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);
        }

        .section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 22px;
        }

        .section-heading h2 {
          margin: 0;
          color: #172019;
        }

        .section-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #edf7ed;
          color: #2e7d32;
          font-size: 23px;
        }

        .product-form {
          max-width: 850px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .form-group {
          margin-bottom: 17px;
        }

        .form-group label {
          display: block;
          margin-bottom: 7px;
          color: #263128;
          font-size: 14px;
          font-weight: 600;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
        }

        .primary-btn {
          width: auto;
          background: #2e7d32;
          color: white;
        }

        .message {
          margin-top: 18px;
          padding: 12px 15px;
          border-radius: 9px;
          background: #edf7ed;
          color: #1b5e20;
          font-weight: 500;
        }

        .products-section {
          margin-top: 38px;
        }

        .product-count {
          color: #68736b;
          font-size: 14px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .product-card {
          padding: 20px;
          background: white;
          border: 1px solid #e1e6df;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .product-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .product-emoji {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #f0f7ed;
          font-size: 23px;
        }

        .active-badge {
          padding: 5px 9px;
          border-radius: 20px;
          background: #dcfce7;
          color: #166534;
          font-size: 12px;
          font-weight: 700;
        }

        .product-card h3 {
          margin: 0 0 7px;
          color: #172019;
          font-size: 19px;
        }

        .product-description {
          min-height: 44px;
          margin: 0 0 15px;
          color: #68736b;
          font-size: 13px;
        }

        .product-price {
          color: #2e7d32;
          font-size: 22px;
          font-weight: 700;
        }

        .product-price span {
          color: #68736b;
          font-size: 13px;
          font-weight: 400;
        }

        .quantity-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 15px;
          padding: 12px;
          border-radius: 9px;
          background: #f6f8f5;
        }

        .quantity-box span {
          color: #68736b;
          font-size: 12px;
        }

        .quantity-box strong {
          color: #263128;
          font-size: 13px;
        }

        .product-actions {
          display: flex;
          gap: 9px;
          margin-top: 17px;
        }

        .product-actions button {
          flex: 1;
        }

        .edit-btn {
          background: #eef6ef;
          color: #2e7d32;
        }

        .edit-btn:hover {
          background: #dceedd;
          color: #1b5e20;
        }

        .delete-btn {
          background: #fff0f0;
          color: #c62828;
        }

        .delete-btn:hover {
          background: #fee2e2;
          color: #991b1b;
        }

        .empty-card {
          padding: 45px 20px;
          text-align: center;
          background: white;
          border: 1px solid #e1e6df;
          border-radius: 14px;
        }

        .empty-icon,
        .loading-icon {
          font-size: 35px;
        }

        .empty-card h3 {
          margin: 12px 0 5px;
        }

        .empty-card p {
          margin: 0;
        }

        .edit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .edit-header h3 {
          margin: 0;
        }

        .close-btn {
          width: 35px;
          min-height: 35px;
          padding: 0;
          background: #f3f4f3;
          color: #555;
        }

        .edit-buttons {
          display: flex;
          gap: 10px;
        }

        .secondary-btn {
          background: #eef0ed;
          color: #263128;
        }

        .secondary-btn:hover {
          background: #e1e5e0;
          color: #172019;
        }

        .orders-card {
          margin-top: 38px;
          padding: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          background: #1b5e20;
          border-radius: 16px;
          color: white;
        }

        .orders-card .eyebrow {
          color: #b7e0ba;
        }

        .orders-card h2 {
          margin: 0;
          color: white;
        }

        .orders-card p:not(.eyebrow) {
          margin-bottom: 0;
          color: #d9eadb;
        }

        .orders-card .primary-link {
          flex-shrink: 0;
          background: white;
          color: #1b5e20;
        }

        .orders-card .primary-link:hover {
          background: #f1f8f2;
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stats-grid .stat-card:last-child {
            grid-column: span 2;
          }
        }

        @media (max-width: 650px) {
          .farmer-page {
            padding: 20px 12px 40px;
          }

          .farmer-header {
            align-items: stretch;
            flex-direction: column;
          }

          .farmer-header h1 {
            font-size: 28px;
          }

          .orders-link {
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid .stat-card:last-child {
            grid-column: auto;
          }

          .dashboard-card {
            padding: 18px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .product-actions {
            flex-direction: column;
          }

          .product-actions button {
            width: 100%;
          }

          .edit-buttons {
            flex-direction: column;
          }

          .edit-buttons button {
            width: 100%;
          }

          .orders-card {
            flex-direction: column;
            align-items: stretch;
            padding: 20px;
          }

          .orders-card .primary-link {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}