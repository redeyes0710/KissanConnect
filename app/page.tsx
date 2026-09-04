"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  unit: string;
  category: string | null;
  variety: string | null;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [variety, setVariety] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (category) {
        params.set("category", category);
      }

      if (variety.trim()) {
        params.set("variety", variety.trim());
      }

      const response = await fetch(`/api/products?${params.toString()}`);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to search products");
      }

      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError("Unable to search products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setSearch("");
    setCategory("");
    setVariety("");
    setProducts([]);
    setSearched(false);
    setError("");
  }

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 30px",
      }}
    >
      {/* Header */}
      <section style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          KisanConnect
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#555",
            marginBottom: "35px",
          }}
        >
          Connecting farmers directly with buyers.
        </p>
      </section>

      {/* Search */}
      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "25px",
          marginBottom: "35px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Find Products</h2>

        <form onSubmit={handleSearch}>
          {/* Search text */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="search">
              Search product
            </label>

            <input
              id="search"
              type="text"
              placeholder="e.g. Mango, Apple, Tomato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            >
              <option value="">All categories</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Grains">Grains</option>
              <option value="Pulses">Pulses</option>
              <option value="Spices">Spices</option>
            </select>
          </div>

          {/* Variety */}
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="variety">
              Variety
            </label>

            <input
              id="variety"
              type="text"
              placeholder="e.g. Hapus, Langda, Kashmiri Apple..."
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Buttons */}
          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#2e7d32",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>

            <button
              type="button"
              onClick={clearSearch}
              style={{
                padding: "12px 24px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </section>

      {/* Error */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* Results */}
      {searched && !loading && (
        <section>
          <h2>Products</h2>

          {products.length === 0 ? (
            <p>
              No products found. Try a different search,
              category, or variety.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>
                    {product.name}
                  </h3>

                  {product.variety && (
                    <p>
                      <strong>Variety:</strong>{" "}
                      {product.variety}
                    </p>
                  )}

                  {product.category && (
                    <p>
                      <strong>Category:</strong>{" "}
                      {product.category}
                    </p>
                  )}

                  {product.description && (
                    <p>{product.description}</p>
                  )}

                  <p>
                    <strong>₹{product.price}</strong> /{" "}
                    {product.unit}
                  </p>

                  <p>
                    Available: {product.quantity}{" "}
                    {product.unit}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Login buttons */}
      <section
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <a href="/login?role=farmer">
          <button
            style={{
              background: "#2e7d32",
              color: "white",
              border: "none",
              padding: "14px 22px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              marginRight: "5px",
            }}
          >
            I'm a Farmer
          </button>
        </a>

        <a href="/login?role=buyer">
          <button
            style={{
              background: "#2e7d32",
              color: "white",
              border: "none",
              padding: "14px 22px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            I'm a Buyer
          </button>
        </a>
      </section>
    </main>
  );
}