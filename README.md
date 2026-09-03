# KISAN Connect (Problem Statement ID: 26033)
**Direct Farmer-to-Buyer Digital Marketplace with AI Demand Forecasting & Logistics**

Theme: Agriculture, FoodTech & Rural Development  
Department: Department of Consumer Affairs (DoCA) / Ministry of Consumer Affairs, Food & Public Distribution

---

## Overview

KISAN Connect bridges the gap between agricultural producers (farmers and FPOs) and institutional/bulk buyers. By eliminating unnecessary intermediate layers, farmers earn fairer realizations while consumers and bulk buyers receive fresher produce at reduced costs.

### Key Capabilities in this Prototype:
- **Direct Produce Marketplace**: Farmers list crops with real-time field attributes and benchmarked prices (`/api/products`).
- **AI Demand Forecasting Engine**: Deterministic, explainable demand forecasts powered by historical order volume momentum and trend velocity (`/api/forecast`).
- **Resilient Seed Fallback**: Seeded agricultural order datasets for offline judging reliability, clearly labeled as prototype demo data.

---

## AI Demand Forecast Architecture

- **Engine (`lib/forecast.ts`)**: Pure TypeScript mathematical model computing dampened linear trend velocity and Weighted Moving Average (WMA). 100% deterministic and unit-testable without database dependency.
- **Seed Datasets (`lib/seedData.ts`)**: Historical weekly order volumes for Tomato, Sharbati Wheat, Red Onion, Potato, and Mustard Seed with explicit `"Prototype estimate • Demo data"` labeling.
- **API Endpoint (`app/api/forecast/route.ts`)**: `GET /api/forecast?product=<CropName>`. Queries Supabase orders first, falls back gracefully to seed data when the database is empty or offline, and provides full error handling (400, 404, 500).
- **UI Component (`components/ForecastPanel.tsx`)**: Reactive dashboard panel with loading, error, empty, and success states, trend indicator pill, historical progression cards, and actionable agricultural recommendations.

---

## Getting Started

### 1. Prerequisites
- Node.js LTS (v20+ or v24+)
- npm

### 2. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase project URL and anon/publishable key if available. If unconfigured, the prototype automatically runs on verified local demo seed data.

### 3. Install & Run
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing the Demand Forecast

1. **Tomato (Increasing trend)**: [http://localhost:3000/api/forecast?product=Tomato](http://localhost:3000/api/forecast?product=Tomato)
2. **Sharbati Wheat (Wholesale demand)**: [http://localhost:3000/api/forecast?product=Wheat](http://localhost:3000/api/forecast?product=Wheat)
3. **Red Onion (Volume surge)**: [http://localhost:3000/api/forecast?product=Onion](http://localhost:3000/api/forecast?product=Onion)
4. **Unknown Crop (Handled 404)**: [http://localhost:3000/api/forecast?product=DragonFruit](http://localhost:3000/api/forecast?product=DragonFruit)
5. **Missing Parameter (Handled 400)**: [http://localhost:3000/api/forecast](http://localhost:3000/api/forecast)
