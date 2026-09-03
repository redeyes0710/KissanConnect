"use client";

import React, { useEffect, useState } from "react";

export interface DemandDataPoint {
  period: string;
  quantity: number;
}

export interface ForecastResponse {
  success: boolean;
  product: string;
  forecastQuantity: number;
  unit: string;
  trend: "increasing" | "decreasing" | "stable";
  changePercentage: number;
  recommendation: string;
  method?: string;
  isDemoData: boolean;
  dataSource: string;
  historicalData?: DemandDataPoint[];
  error?: string;
}

interface ForecastPanelProps {
  selectedCrop?: string;
  onCropChange?: (crop: string) => void;
}

export default function ForecastPanel({
  selectedCrop = "Tomato",
  onCropChange,
}: ForecastPanelProps) {
  const [crop, setCrop] = useState(selectedCrop);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCrop && selectedCrop !== crop) {
      setCrop(selectedCrop);
    }
  }, [selectedCrop]);

  const fetchForecast = async (cropName: string) => {
    if (!cropName || !cropName.trim()) {
      setError("Please specify a product name to calculate forecast.");
      setForecast(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/forecast?product=${encodeURIComponent(cropName.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Unable to calculate the forecast.");
        setForecast(null);
      } else {
        setForecast(data);
        setError(null);
      }
    } catch {
      setError("Unable to calculate the forecast. Check network or server status.");
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast(crop);
  }, [crop]);

  const handleQuickSelect = (newCrop: string) => {
    setCrop(newCrop);
    if (onCropChange) onCropChange(newCrop);
  };

  return (
    <aside className="w-full bg-white rounded-2xl border border-[#E0E0DA] shadow-sm p-6 flex flex-col gap-5">
      {/* Header with Title & Prototype Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E0E0DA] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
              AI Demand Insights
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#1A1A1A] mt-0.5">
            Agricultural Demand Forecast
          </h2>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF3E0] text-[#EF6C00] border border-[#FFE0B2] text-xs font-semibold self-start sm:self-auto">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.75 12h-1.5v-1.5h1.5V14zm0-3h-1.5V6h1.5v5z" />
          </svg>
          <span>Prototype estimate • Demo data</span>
        </div>
      </div>

      {/* Interactive Crop Quick Selectors */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#5F6368] uppercase tracking-wide">
          Select Crop to Analyze:
        </label>
        <div className="flex flex-wrap gap-2">
          {["Tomato", "Sharbati Wheat", "Red Onion", "Potato", "Mustard Seed"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleQuickSelect(item)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                crop.toLowerCase() === item.toLowerCase()
                  ? "bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm"
                  : "bg-[#FAFAF7] text-[#1A1A1A] border-[#E0E0DA] hover:bg-[#EAEAE5]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Main State Container */}
      <div className="min-h-[260px] flex flex-col justify-center">
        {/* 1. LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div className="w-10 h-10 border-3 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-[#1A1A1A]">
              Calculating demand forecast...
            </p>
            <p className="text-xs text-[#5F6368]">
              Analyzing historical order batches & market velocity for {crop}
            </p>
          </div>
        )}

        {/* 2. ERROR STATE */}
        {!loading && error && (
          <div className="p-5 rounded-xl bg-red-50 border border-red-200 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-[#C62828] flex items-center justify-center text-xl font-bold">
              !
            </div>
            <div>
              <p className="text-sm font-bold text-[#C62828]">
                Unable to calculate the forecast.
              </p>
              <p className="text-xs text-[#5F6368] mt-1">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => fetchForecast(crop)}
              className="px-4 py-1.5 rounded-lg bg-white border border-red-300 text-xs font-semibold text-[#C62828] hover:bg-red-50 transition-colors shadow-xs"
            >
              Retry Calculation
            </button>
          </div>
        )}

        {/* 3. EMPTY STATE */}
        {!loading && !error && !forecast && (
          <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
            <svg
              className="w-12 h-12 text-[#5F6368]/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="text-sm font-medium text-[#5F6368]">
              No historical demand data available.
            </p>
          </div>
        )}

        {/* 4. SUCCESS STATE */}
        {!loading && !error && forecast && (
          <div className="flex flex-col gap-4">
            {/* Product & Primary Metric Box */}
            <div className="bg-[#FAFAF7] border border-[#E0E0DA] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#5F6368]">
                  Product
                </span>
                <h3 className="text-xl font-bold text-[#1A1A1A]">
                  {forecast.product}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5F6368]">
                  Expected Demand
                </span>
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-3xl font-extrabold text-[#2E7D32]">
                    {forecast.forecastQuantity}
                  </span>
                  <span className="text-sm font-semibold text-[#5F6368]">
                    {forecast.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Trend Indicator Pill Banner */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                forecast.trend === "increasing"
                  ? "bg-green-50/70 border-green-200 text-[#1B5E20]"
                  : forecast.trend === "decreasing"
                  ? "bg-amber-50/70 border-amber-200 text-[#B78103]"
                  : "bg-gray-50 border-gray-200 text-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {forecast.trend === "increasing" && "↑"}
                  {forecast.trend === "decreasing" && "↓"}
                  {forecast.trend === "stable" && "→"}
                </span>
                <span className="text-sm font-bold capitalize">
                  Demand {forecast.trend}
                </span>
              </div>

              <span className="text-sm font-extrabold">
                {forecast.changePercentage > 0 ? "+" : ""}
                {forecast.changePercentage}%
              </span>
            </div>

            {/* Historical to Forecast Progression Visualization */}
            {forecast.historicalData && forecast.historicalData.length > 0 && (
              <div className="bg-white rounded-xl border border-[#E0E0DA] p-3.5">
                <div className="flex items-center justify-between text-xs text-[#5F6368] mb-2 font-medium">
                  <span>Historical Demand & Forecast Projection</span>
                  <span className="text-[#2E7D32] font-semibold">
                    {forecast.method || "Deterministic Model"}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  {forecast.historicalData.map((pt, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAFAF7] rounded-lg p-2 border border-[#E0E0DA]/60 flex flex-col"
                    >
                      <span className="text-[11px] text-[#5F6368] font-medium truncate">
                        {pt.period}
                      </span>
                      <span className="text-sm font-bold text-[#1A1A1A] mt-0.5">
                        {pt.quantity} {forecast.unit}
                      </span>
                    </div>
                  ))}

                  {/* Projected Forecast Column */}
                  <div className="bg-green-50 rounded-lg p-2 border border-green-300 flex flex-col">
                    <span className="text-[11px] text-[#2E7D32] font-bold truncate">
                      Forecast
                    </span>
                    <span className="text-sm font-black text-[#2E7D32] mt-0.5">
                      {forecast.forecastQuantity} {forecast.unit}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actionable Agricultural Recommendation */}
            <div className="bg-[#FAFAF7] rounded-xl p-3.5 border-l-4 border-[#2E7D32]">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider block mb-1">
                Recommendation:
              </span>
              <p className="text-sm text-[#1A1A1A] leading-relaxed">
                &ldquo;{forecast.recommendation}&rdquo;
              </p>
            </div>

            {/* Method & Disclosure Footer */}
            <div className="flex items-center justify-between text-[11px] text-[#5F6368] pt-1">
              <span>Data source: {forecast.dataSource}</span>
              <span>Deterministic algorithm</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
