"use client";

import React, { useState, useEffect } from "react";
import ForecastPanel from "@/components/ForecastPanel";

interface Product {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  description?: string;
  created_at?: string;
}

export default function FarmerDashboard() {
  const [name, setName] = useState("Tomato");
  const [price, setPrice] = useState("35");
  const [quantity, setQuantity] = useState("120");
  const [unit, setUnit] = useState("kg");
  const [description, setDescription] = useState("Farm-fresh produce, grade-A harvest");

  const [products, setProducts] = useState<Product[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load existing products from GET /api/products
  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      }
    } catch {
      // Fallback or silent catch if DB is unconfigured
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Submit to POST /api/products
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !quantity || !unit) {
      setFeedback({ type: "error", message: "Name, price, quantity, and unit are required." });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          quantity: Number(quantity),
          unit,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: `Product '${name}' published successfully! Ready for buyer orders.`,
        });
        loadProducts();
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Failed to add product.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Network error while connecting to /api/products.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E0E0DA] px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#2E7D32] text-white flex items-center justify-center font-bold text-lg">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-[#1A1A1A]">
                KISAN Connect
              </span>
              <span className="px-2 py-0.5 rounded-md bg-green-100 text-[#2E7D32] text-[11px] font-bold">
                SIH-26033
              </span>
            </div>
            <p className="text-xs text-[#5F6368]">
              Direct Farmer Marketplace & AI Demand Forecasting
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#5F6368] bg-[#FAFAF7] px-3 py-1.5 rounded-full border border-[#E0E0DA]">
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
            Role: <strong>Farmer / FPO</strong>
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#2E7D32] text-white">
            Live Prototype
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Banner */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
            Farmer Command & Produce Listing
          </h1>
          <p className="text-sm text-[#5F6368] mt-1 max-w-2xl">
            List your crop harvest directly to buyers without intermediaries. Use real-time AI demand insights to guide your batch sizing and market dispatch.
          </p>
        </div>

        {/* 2-Column Split: Produce Form & Forecast Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Produce Listing Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E0E0DA] p-6 shadow-sm flex flex-col gap-6">
            <div className="border-b border-[#E0E0DA] pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">
                  Add Produce Listing
                </h2>
                <p className="text-xs text-[#5F6368]">
                  Directly saved to Supabase <code className="font-mono text-[11px] text-[#2E7D32] bg-green-50 px-1 py-0.5 rounded">products</code> table
                </p>
              </div>
              <span className="text-xs font-mono bg-[#FAFAF7] text-[#5F6368] px-2.5 py-1 rounded-full border border-[#E0E0DA]">
                Step 1 of 1
              </span>
            </div>

            {feedback && (
              <div
                className={`p-4 rounded-xl text-xs font-medium border flex items-center justify-between ${
                  feedback.type === "success"
                    ? "bg-green-50 text-green-900 border-green-200"
                    : "bg-red-50 text-red-900 border-red-200"
                }`}
              >
                <span>{feedback.message}</span>
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="font-bold ml-2 hover:opacity-75"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              {/* Product Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1A1A] flex items-center justify-between">
                  <span>Crop / Produce Variety <span className="text-red-600">*</span></span>
                  <span className="text-[11px] font-normal text-[#5F6368]">Auto-syncs with AI Forecast</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tomato, Sharbati Wheat, Red Onion"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E0E0DA] text-sm focus:outline-none focus:border-[#2E7D32] bg-[#FAFAF7]"
                />
              </div>

              {/* Price and Quantity Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1A1A1A]">
                    Asking Price (₹) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E0E0DA] text-sm focus:outline-none focus:border-[#2E7D32] bg-[#FAFAF7]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1A1A1A]">
                    Available Quantity <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E0E0DA] text-sm focus:outline-none focus:border-[#2E7D32] bg-[#FAFAF7]"
                  />
                </div>
              </div>

              {/* Unit Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1A1A]">
                  Measurement Standard Unit <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["kg", "Qtl", "tonne"].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        unit === u
                          ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                          : "bg-[#FAFAF7] text-[#1A1A1A] border-[#E0E0DA] hover:bg-gray-100"
                      }`}
                    >
                      {u === "kg" ? "Kilogram (kg)" : u === "Qtl" ? "Quintal (100 kg)" : "Metric Tonne"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1A1A]">
                  Harvest Notes / Quality Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Moisture level <12%, graded organic produce..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E0E0DA] text-sm focus:outline-none focus:border-[#2E7D32] bg-[#FAFAF7]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? "Publishing to Marketplace..." : "Publish Produce to Buyer Marketplace"}
              </button>
            </form>
          </div>

          {/* Right Column: AI Demand Forecast Panel (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <ForecastPanel
              selectedCrop={name}
              onCropChange={(crop) => setName(crop)}
            />
          </div>
        </div>

        {/* Existing Products Display from GET /api/products */}
        {products.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl border border-[#E0E0DA] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
              Recently Listed Produce (from Supabase Database)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <div key={p.id || i} className="p-4 rounded-xl border border-[#E0E0DA] bg-[#FAFAF7]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#1A1A1A]">{p.name}</h3>
                    <span className="text-xs font-bold text-[#2E7D32] bg-green-50 px-2 py-0.5 rounded">
                      ₹{p.price} / {p.unit}
                    </span>
                  </div>
                  <p className="text-xs text-[#5F6368] mt-1">Available: {p.quantity} {p.unit}</p>
                  {p.description && (
                    <p className="text-xs text-[#1A1A1A] mt-2 italic">&ldquo;{p.description}&rdquo;</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
