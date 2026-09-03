# KISSAN Connect — Minimum Database Model

The database is intentionally small. Reuse existing Supabase/Postgres tables when possible instead of creating duplicates.

## Core entities

### Profiles / users

Minimum fields needed for prototype role access:
- `id`
- `name`
- `role` — `farmer` / `buyer` / `admin`
- optional contact/location fields only when required by the demo

### Products

Minimum fields:
- `id`
- `farmer_id`
- `name`
- `description`
- `price`
- `quantity`
- `unit`
- `created_at`

### Orders

Minimum fields:
- `id`
- `product_id`
- `buyer_id`
- `quantity`
- `total_price`
- `status`
- `created_at`

If the existing schema already has enough information to connect an order to a product, do not add a redundant `product_name` field solely for convenience.

### Delivery / route data

Only add what the demo needs:
- order reference
- pickup location
- drop location or delivery location
- latitude / longitude
- delivery status

## Demand forecast data

Forecasting should primarily derive history from completed/valid orders. The application should aggregate quantities into daily or weekly buckets before calculating a forecast.

If real history is insufficient, use seeded demo data and label it clearly.

## Data ownership rules

- Member 3 owns schema/data contracts.
- Member 4 owns auth/session/role integration.
- Member 5 consumes order history for forecast and delivery/route inputs.
- Frontend owners consume agreed API responses rather than querying the database directly.

## Security rules

- Secrets and service-role credentials stay server-side.
- Do not commit `.env` files.
- Prototype access control must still prevent obvious cross-role actions where practical.
