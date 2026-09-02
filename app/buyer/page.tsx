"use client";

import { useEffect, useState } from "react";
import { createOrder, getProducts } from "@/lib/api-client";

export default function BuyerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getProducts();
        setProducts(result.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function handleBuy(product: any) {
    const quantity = 1;
    const totalPrice = Number(product.price) * quantity;

    setBuying(product.id);
    setMessage("");

    try {
      const result = await createOrder({
        product_id: product.id,
        quantity,
        total_price: totalPrice,
      });

      if (result.success) {
        setMessage(`Order placed for ${product.name}! ✅`);
      } else {
        setMessage(result.error || "Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while placing the order.");
    } finally {
      setBuying(null);
    }
  }

  if (loading) {
    return <main>Loading products...</main>;
  }

  return (
    <main>
      <h1>Buyer Marketplace</h1>

      <p>Buy fresh products directly from farmers.</p>

      {message && <p>{message}</p>}

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <p>
              Price: ₹{product.price} / {product.unit}
            </p>

            <p>
              Available: {product.quantity} {product.unit}
            </p>

            <button
              onClick={() => handleBuy(product)}
              disabled={buying === product.id}
            >
              {buying === product.id ? "Placing Order..." : "Buy Now"}
            </button>

            <hr />
          </div>
        ))
      )}
      <a href="/buyer/orders">
  <button>My Orders</button>
</a>
    </main>
  );
}