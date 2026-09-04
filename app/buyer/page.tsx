"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createOrder, getProducts } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  unit: string;
  farmer_id?: string | null;
  category?: string | null;
  variety?: string | null;
  created_at?: string;
};

export default function BuyerPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [variety, setVariety] = useState("");

  const [quantities, setQuantities] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setMessage("");

      const result = await getProducts();

      const productList = (result.products || []) as Product[];

      setProducts(productList);

      const initialQuantities: Record<string, number> = {};

      productList.forEach((product) => {
        initialQuantities[product.id] = 1;
      });

      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Failed to load products:", error);
      setMessage("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  function changeQuantity(
    productId: string,
    amount: number,
    maxQuantity: number
  ) {
    setQuantities((current) => {
      const currentQuantity = current[productId] || 1;

      const newQuantity = Math.max(
        1,
        Math.min(
          currentQuantity + amount,
          Number(maxQuantity)
        )
      );

      return {
        ...current,
        [productId]: newQuantity,
      };
    });
  }

  async function handleBuy(product: Product) {
    const { data, error: userError } =
      await supabase.auth.getUser();

    if (userError || !data.user) {
      setMessage("Please login before placing an order.");
      return;
    }

    const buyerId = data.user.id;
    const quantity = quantities[product.id] || 1;
    const totalPrice = Number(product.price) * quantity;

    setBuying(product.id);
    setMessage("");

    try {
      const result = await createOrder({
        product_id: product.id,
        buyer_id: buyerId,
        quantity,
        total_price: totalPrice,
      });

      if (result.success) {
        setMessage(
          `Order placed for ${product.name}! Total: ₹${totalPrice} ✅`
        );
      } else {
        setMessage(
          result.error || "Failed to place order."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong while placing the order."
      );
    } finally {
      setBuying(null);
    }
  }

  // Get unique categories from available products
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      )
    ).sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();
    const varietyText = variety.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        (product.description || "")
          .toLowerCase()
          .includes(searchText) ||
        (product.variety || "")
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        !category ||
        product.category?.toLowerCase() ===
          category.toLowerCase();

      const matchesVariety =
        !varietyText ||
        (product.variety || "")
          .toLowerCase()
          .includes(varietyText);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesVariety
      );
    });
  }, [products, search, category, variety]);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setVariety("");
  }

  if (loading) {
    return (
      <main className="buyer-page">
        <div className="container">
          <Link href="/" className="back-button">
            ← Back
          </Link>

          <div className="loading-card">
            <div className="loading-icon">🌾</div>
            <h2>Loading marketplace...</h2>
            <p>
              Finding fresh products from farmers.
            </p>
          </div>
        </div>

        <style jsx>{`
          .buyer-page {
            min-height: 100vh;
            padding: 25px 16px 60px;
            background: #f6f8f5;
          }

          .container {
            width: min(1100px, 100%);
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
            text-decoration: none;
          }

          .back-button:hover {
            background: #edf7ed;
            color: #1b5e20;
          }

          .loading-card {
            padding: 55px 20px;
            background: white;
            border: 1px solid #e1e6df;
            border-radius: 16px;
            text-align: center;
          }

          .loading-icon {
            font-size: 40px;
          }

          .loading-card h2 {
            margin: 12px 0 5px;
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
    <main className="buyer-page">
      <div className="container">

        {/* HEADER */}

        <Link href="/" className="back-button">
          ← Back
        </Link>

        <header className="page-header">
          <h1>KisanConnect Marketplace</h1>
          <p>
            Find fresh products directly from farmers.
          </p>
        </header>

        {/* SEARCH / FILTER SECTION */}

        <section className="search-card">
          <h2>Find Products</h2>

          <div className="field">
            <label htmlFor="search">
              Search product
            </label>

            <input
              id="search"
              type="text"
              placeholder="e.g. Mango, Apple, Tomato..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="field">
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="">
                All categories
              </option>

              {categories.map((item) => (
                <option key={item} value={item || ""}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="variety">
              Variety
            </label>

            <input
              id="variety"
              type="text"
              placeholder="e.g. Hapus, Langda, Kashmiri Apple..."
              value={variety}
              onChange={(e) =>
                setVariety(e.target.value)
              }
            />
          </div>

          <div className="filter-buttons">
            <button
              type="button"
              className="search-button"
              onClick={() => {
                // Filtering is already live.
                // This button is provided for the UI.
                setSearch(search.trim());
                setVariety(variety.trim());
              }}
            >
              Search
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </section>

        {/* MESSAGE */}

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {/* RESULTS */}

        <section className="results-section">
          <div className="results-header">
            <h2>Available Products</h2>

            <span>
              {filteredProducts.length} product
              {filteredProducts.length !== 1
                ? "s"
                : ""}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-card">
              <div className="empty-icon">🔍</div>

              <h3>No products found</h3>

              <p>
                Try a different product name,
                category, or variety.
              </p>

              <button
                type="button"
                className="clear-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const quantity =
                  quantities[product.id] || 1;

                const totalPrice =
                  Number(product.price) * quantity;

                return (
                  <article
                    key={product.id}
                    className="product-card"
                  >
                    <div className="product-top">
                      <div>
                        <h3>{product.name}</h3>

                        {product.variety && (
                          <p className="variety">
                            {product.variety}
                          </p>
                        )}
                      </div>

                      {product.category && (
                        <span className="category">
                          {product.category}
                        </span>
                      )}
                    </div>

                    <p className="description">
                      {product.description ||
                        "Fresh farm product."}
                    </p>

                    <div className="product-info">
                      <div>
                        <span>Price</span>
                        <strong>
                          ₹{product.price}
                        </strong>
                        <small>
                          / {product.unit}
                        </small>
                      </div>

                      <div>
                        <span>Available</span>
                        <strong>
                          {product.quantity}
                        </strong>
                        <small>
                          {product.unit}
                        </small>
                      </div>
                    </div>

                    {/* QUANTITY */}

                    <div className="quantity-section">
                      <label>Quantity</label>

                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(
                              product.id,
                              -1,
                              product.quantity
                            )
                          }
                          disabled={quantity <= 1}
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(
                              product.id,
                              1,
                              product.quantity
                            )
                          }
                          disabled={
                            quantity >=
                            Number(product.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="order-bottom">
                      <div className="total">
                        <span>Total</span>
                        <strong>
                          ₹{totalPrice}
                        </strong>
                      </div>

                      <button
                        type="button"
                        className="buy-button"
                        onClick={() =>
                          handleBuy(product)
                        }
                        disabled={
                          buying === product.id
                        }
                      >
                        {buying === product.id
                          ? "Placing Order..."
                          : "Buy"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ROLE BUTTONS */}

        <div className="role-buttons">
          <Link
            href="/login?role=farmer"
            className="role-button"
          >
            I'm a Farmer
          </Link>

          <Link
            href="/login?role=buyer"
            className="role-button"
          >
            I'm a Buyer
          </Link>
        </div>
      </div>

      <style jsx>{`
        .buyer-page {
          min-height: 100vh;
          padding: 25px 16px 60px;
          background: #f6f8f5;
        }

        .container {
          width: min(1100px, 100%);
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
          text-decoration: none;
        }

        .back-button:hover {
          background: #edf7ed;
        }

        .page-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .page-header h1 {
          margin: 0 0 10px;
          color: #172019;
          font-size: 38px;
        }

        .page-header p {
          margin: 0;
          color: #68736b;
          font-size: 18px;
        }

        .search-card {
          background: white;
          border: 1px solid #dfe5de;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 35px;
        }

        .search-card h2 {
          margin: 0 0 22px;
          color: #172019;
        }

        .field {
          margin-bottom: 18px;
        }

        .field label {
          display: block;
          margin-bottom: 8px;
          color: #172019;
          font-weight: 600;
        }

        .field input,
        .field select {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid #ccd4cb;
          border-radius: 9px;
          background: white;
          color: #172019;
          font-size: 16px;
          outline: none;
        }

        .field input:focus,
        .field select:focus {
          border-color: #2e7d32;
        }

        .filter-buttons {
          display: flex;
          gap: 10px;
          margin-top: 22px;
        }

        .search-button,
        .clear-button,
        .buy-button,
        .role-button {
          border: none;
          border-radius: 9px;
          padding: 12px 20px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .search-button {
          background: #2e7d32;
          color: white;
        }

        .search-button:hover {
          background: #256b29;
        }

        .clear-button {
          background: #edf1ed;
          color: #334036;
        }

        .clear-button:hover {
          background: #e0e6e0;
        }

        .message {
          margin-bottom: 25px;
          padding: 14px 16px;
          border-radius: 9px;
          background: #edf7ed;
          border: 1px solid #cce3cc;
          color: #245c28;
          font-weight: 600;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .results-header h2 {
          margin: 0;
          color: #172019;
        }

        .results-header span {
          color: #68736b;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(280px, 1fr)
          );
          gap: 20px;
        }

        .product-card {
          background: white;
          border: 1px solid #dfe5de;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .product-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .product-top h3 {
          margin: 0;
          color: #172019;
          font-size: 23px;
        }

        .variety {
          margin: 5px 0 0;
          color: #2e7d32;
          font-weight: 600;
        }

        .category {
          padding: 6px 10px;
          border-radius: 20px;
          background: #edf7ed;
          color: #2e7d32;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }

        .description {
          min-height: 42px;
          margin: 16px 0;
          color: #68736b;
          line-height: 1.5;
        }

        .product-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .product-info div {
          padding: 12px;
          border-radius: 9px;
          background: #f6f8f5;
        }

        .product-info span {
          display: block;
          color: #68736b;
          font-size: 13px;
          margin-bottom: 4px;
        }

        .product-info strong {
          color: #172019;
          font-size: 19px;
        }

        .product-info small {
          margin-left: 4px;
          color: #68736b;
        }

        .quantity-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .quantity-section label {
          font-weight: 600;
          color: #172019;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          border: 1px solid #ccd4cb;
          border-radius: 9px;
          overflow: hidden;
        }

        .quantity-control button {
          width: 38px;
          height: 38px;
          border: none;
          background: #f6f8f5;
          color: #2e7d32;
          font-size: 20px;
          cursor: pointer;
        }

        .quantity-control button:disabled {
          color: #aab2aa;
          cursor: not-allowed;
        }

        .quantity-control span {
          width: 38px;
          text-align: center;
          font-weight: 700;
        }

        .order-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding-top: 18px;
          border-top: 1px solid #e7ebe6;
        }

        .total span {
          display: block;
          color: #68736b;
          font-size: 13px;
        }

        .total strong {
          color: #172019;
          font-size: 22px;
        }

        .buy-button {
          background: #2e7d32;
          color: white;
        }

        .buy-button:hover {
          background: #256b29;
        }

        .buy-button:disabled {
          background: #9eaaa0;
          cursor: not-allowed;
        }

        .empty-card {
          background: white;
          border: 1px solid #dfe5de;
          border-radius: 16px;
          padding: 55px 20px;
          text-align: center;
        }

        .empty-icon {
          font-size: 40px;
        }

        .empty-card h3 {
          margin: 12px 0 6px;
          color: #172019;
        }

        .empty-card p {
          margin: 0 0 20px;
          color: #68736b;
        }

        .role-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 45px;
        }

        .role-button {
          background: #2e7d32;
          color: white;
          text-decoration: none;
        }

        .role-button:hover {
          background: #256b29;
        }

        @media (max-width: 650px) {
          .buyer-page {
            padding: 18px 12px 40px;
          }

          .page-header h1 {
            font-size: 30px;
          }

          .search-card {
            padding: 20px;
          }

          .results-header {
            align-items: flex-start;
            gap: 10px;
          }

          .product-top {
            flex-direction: column;
          }

          .quantity-section,
          .order-bottom {
            align-items: flex-start;
          }

          .role-buttons {
            flex-direction: column;
          }

          .role-button {
            text-align: center;
          }
        }
      `}</style>
    </main>
  );
}