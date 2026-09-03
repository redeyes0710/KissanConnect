# KISSAN Connect — AI + Logistics Specification

## Demand forecasting

### Purpose
Give farmers a simple estimate of next-period demand and a plain-language recommendation.

### Input
- product identifier/name
- historical order quantities
- timestamps sufficient for daily/weekly aggregation
- unit

### Processing
```text
Orders
  ↓
Filter by product
  ↓
Aggregate by day/week
  ↓
Calculate trend velocity
  ↓
Project next period with a dampened trend
  ↓
Classify trend
  ↓
Generate deterministic recommendation
```

The numerical result must be deterministic and testable locally. An LLM may optionally generate narration later, but it must never be the only source of the numeric forecast.

### Output
- product
- forecast quantity
- unit
- trend: `increasing | decreasing | stable`
- percentage change
- recommendation
- method
- data source/demo flag
- historical points used

### Demo data
Use realistic synthetic quantities when the database does not have enough history. Display `Prototype estimate • Demo data` or an equivalent clear disclosure.

### Current implementation status
The branch `feature/demand-forecast` contains an implementation in `lib/forecast.ts`, `app/api/forecast/route.ts`, `components/ForecastPanel.tsx`, seed data, and forecast tests. Because that branch has unrelated history from `main`, it should be reviewed and selectively ported onto a fresh feature branch based on current `develop`.

## Logistics route optimization

### Purpose
Show that orders can be grouped into a practical pickup/delivery sequence without pretending to provide live traffic or GPS optimization.

### Input
- origin/warehouse location
- delivery stops with latitude/longitude
- optional quantity/order metadata

### Processing
```text
Order locations
  ↓
Validate coordinates
  ↓
Calculate straight-line distance (Haversine)
  ↓
Generate nearest-neighbour route
  ↓
Optionally improve route with 2-opt
  ↓
Return stop sequence + total distance
```

### Output
- ordered stops
- total distance
- optional baseline vs improved distance
- clear indication that the route is a prototype estimate and does not use live traffic

## AI safety for the prototype

- No invented accuracy percentage.
- No claim of production-grade prediction.
- No external AI dependency for core math.
- No hidden synthetic values presented as real market data.
