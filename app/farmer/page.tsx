"use client";

import { useState } from "react";
import { createProduct } from "@/lib/api-client";

export default function FarmerPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const result = await createProduct({
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        unit,
      });

      if (result.success) {
        setMessage("Product listed successfully! ✅");

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

        <button type="submit">Create Listing</button>
      </form>
      <a href="/farmer/orders">
  <button>View Orders</button>
</a>

      {message && <p>{message}</p>}
    </main>
  );
}