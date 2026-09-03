"use client";

import { useState } from "react";
import { createProduct } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";

export default function FarmerPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // Get the currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("You must be logged in to create a listing.");
        setLoading(false);
        return;
      }

      // Create product with the logged-in farmer's ID
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

        // Clear form
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setUnit("kg");
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

  return (
    <main>
      <h1>Farmer Dashboard</h1>

      <h2>Create Product Listing</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <br />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tomato"
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product"
          />
        </div>

        <br />

        <div>
          <label>Price (₹)</label>
          <br />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="40"
            min="0"
            required
          />
        </div>

        <br />

        <div>
          <label>Quantity</label>
          <br />

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="100"
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Unit</label>
          <br />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="quintal">quintal</option>
            <option value="ton">ton</option>
            <option value="piece">piece</option>
          </select>
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <br />

      <a href="/farmer/orders">
        <button type="button">View Orders</button>
      </a>
    </main>
  );
}