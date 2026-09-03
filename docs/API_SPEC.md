# KISSAN Connect — API Specification

All application APIs use JSON. Every response should include a predictable `success` boolean.

## Products

### GET `/api/products`
Returns available produce listings.

Success:
```json
{ "success": true, "products": [] }
```

### POST `/api/products`
Input: `name`, `description`, `price`, `quantity`, `unit`, and farmer ownership/user reference as agreed with the auth/data layer.

Validation: name required, price >= 0, quantity > 0, unit required.

## Orders

### GET `/api/orders`
Returns prototype order records. Future filtering can use buyer/farmer/product/status.

### POST `/api/orders`
Input: `product_id`, `quantity`, `total_price`, and buyer ownership/user reference as agreed with the auth/data layer. `status` defaults to `pending`.

Validation: product ID required, quantity > 0, total price >= 0.

## Forecast

### GET `/api/forecast?product=<name>`
or
### GET `/api/forecast?productId=<id>`

Success shape:
```json
{
  "success": true,
  "product": "Tomato",
  "forecastQuantity": 150,
  "unit": "kg",
  "trend": "increasing",
  "changePercentage": 7.1,
  "recommendation": "...",
  "method": "...",
  "isDemoData": true,
  "dataSource": "Prototype estimate • Demo data",
  "historicalData": []
}
```

The numerical forecast must remain deterministic and runnable without an LLM.

## Route optimization

### GET/POST `/api/route-optimize`

Prototype input should contain origin/warehouse and delivery stops with latitude, longitude, and optional quantity. Output should provide total distance plus the recommended stop order.

Example:
```json
{
  "success": true,
  "totalDistanceKm": 42.3,
  "stops": []
}
```

## Dashboard summary

### GET `/api/admin/summary`
Returns lightweight prototype metrics such as product count, order count, and total order value.

## Authentication

Authentication endpoints must be defined only after the current repository and chosen prototype auth approach are inspected. Do not invent a production identity system for this project.

## API rules

- Validate server-side.
- Never return secrets.
- Use clear 4xx responses for invalid input/not found/unauthorized cases.
- Use 5xx only for unexpected server failures.
- Keep response fields stable once frontend integration begins.
