# KISAN Connect — API Documentation

## 1. AI Demand Forecast API

### Endpoint
`GET /api/forecast`

Retrieves real-time, deterministic agricultural demand forecast metrics, trend vectors, and actionable farmer recommendations.

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product` or `name` | `string` | Conditionally | Crop name or variety alias (e.g. `Tomato`, `Wheat`, `Onion`). |
| `productId` or `id` | `string` | Conditionally | Supabase UUID identifier for an existing product listing. |

*Note: At least one of `product` or `productId` must be provided.*

### Response Format (Success — 200 OK)
```json
{
  "success": true,
  "product": "Tomato",
  "forecastQuantity": 150,
  "unit": "kg",
  "trend": "increasing",
  "changePercentage": 7.1,
  "recommendation": "Demand for Tomato is expected to increase (+7.1%). Consider preparing additional supply and scheduling prompt farm-gate dispatch.",
  "method": "Dampened Linear Trend Velocity (Deterministic Model)",
  "isDemoData": true,
  "dataSource": "Prototype estimate • Demo data",
  "historicalData": [
    { "period": "Week 1", "quantity": 100 },
    { "period": "Week 2", "quantity": 120 },
    { "period": "Week 3", "quantity": 140 }
  ]
}
```

### Response Fields
- `success` (`boolean`): Indicates whether the forecast operation completed successfully.
- `product` (`string`): The resolved crop name.
- `forecastQuantity` (`number`): The deterministic numerical forecast for the upcoming period.
- `unit` (`string`): Produce unit of measurement (`kg`, `Qtl`, `tonne`).
- `trend` (`string`): Market momentum direction: `"increasing"`, `"decreasing"`, or `"stable"`.
- `changePercentage` (`number`): Forecasted percentage deviation compared to the most recent period.
- `recommendation` (`string`): Farmer-focused, actionable operational guidance.
- `isDemoData` (`boolean`): Explicit boolean disclosure tag.
- `dataSource` (`string`): Disclosure string identifying whether live Supabase orders or prototype demo seed data was utilized.
- `historicalData` (`array`): Historical time-series points used to derive the forecast.

### Error Responses

#### 400 Bad Request — Missing Parameters
```json
{
  "success": false,
  "error": "Product name or productId query parameter is required (e.g. /api/forecast?product=Tomato)"
}
```

#### 404 Not Found — Crop Not In Database Or Seed
```json
{
  "success": false,
  "error": "No historical or demo demand data available for product 'DragonFruit'.",
  "availableDemoCrops": [
    "Tomato",
    "Sharbati Wheat",
    "Red Onion",
    "Potato",
    "Mustard Seed"
  ]
}
```

#### 500 Internal Server Error — Calculation / Service Failure
```json
{
  "success": false,
  "error": "Unable to calculate demand forecast due to an internal calculation error."
}
```

---

## 2. Produce Marketplace API

### Endpoint
`GET /api/products` — Retrieve all active farmer produce listings.  
`POST /api/products` — Publish a new produce harvest listing to the marketplace.
