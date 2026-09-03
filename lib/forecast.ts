/**
 * KISAN CONNECT — AI Demand Forecasting Engine
 * 
 * ALGORITHM EXPLANATION:
 * This prototype uses a deterministic, trend-aware time-series model:
 * 1. Historical Demand Analysis: Takes time-bucketed order quantities (e.g. weekly or daily).
 * 2. Trend Velocity (Slope): Calculates the average rate of change between consecutive periods.
 *    rateOfChange = (latestQuantity - initialQuantity) / (numPeriods - 1)
 * 3. Forecast Calculation: Projects the next period demand using a dampened trend adjustment:
 *    forecastQuantity = Math.round(latestQuantity + (rateOfChange * 0.5))
 *    (Ensures forecasts are responsive to momentum without extreme overshoots).
 * 4. Trend Classification:
 *    - 'increasing': changePercentage > +2%
 *    - 'decreasing': changePercentage < -2%
 *    - 'stable': -2% <= changePercentage <= +2%
 * 5. Actionable Agricultural Recommendation: Generated deterministically based on trend direction
 *    and magnitude.
 * 
 * NOTE: This is an explainable, deterministic prototype model designed for local hackathon demo
 * stability. It does not use external ML servers or LLMs for numerical forecasting.
 */

export interface HistoricalDemandPoint {
  period: string; // e.g., "Week 1", "Week 2", "Week 3"
  quantity: number;
}

export type DemandTrend = "increasing" | "decreasing" | "stable";

export interface ForecastCalculationResult {
  forecastQuantity: number;
  trend: DemandTrend;
  changePercentage: number;
  recommendation: string;
  method: string;
}

export interface ProductDemandForecast extends ForecastCalculationResult {
  product: string;
  unit: string;
  isDemoData: boolean;
  dataSource: string;
  historicalData: HistoricalDemandPoint[];
}

/**
 * Pure calculation function for demand forecasting.
 * Produces identical output for identical inputs.
 */
export function calculateDemandForecast(
  historicalData: HistoricalDemandPoint[],
  productName: string = "Produce",
  unit: string = "kg"
): ForecastCalculationResult {
  if (!historicalData || historicalData.length === 0) {
    throw new Error("Cannot calculate forecast: historical demand data is empty");
  }

  const n = historicalData.length;
  const quantities = historicalData.map((d) => d.quantity);

  // Single data point case
  if (n === 1) {
    const singleQty = quantities[0];
    return {
      forecastQuantity: singleQty,
      trend: "stable",
      changePercentage: 0,
      recommendation: `Historical volume for ${productName} is currently baseline at ${singleQty} ${unit}. Monitor buyer orders as new batches are listed.`,
      method: "Single-period baseline",
    };
  }

  const firstQty = quantities[0];
  const latestQty = quantities[n - 1];

  // Calculate linear trend rate of change across periods
  const rateOfChange = (latestQty - firstQty) / (n - 1);

  // Forecast using dampened trend velocity projection
  // E.g., for [100, 120, 140]: rateOfChange = 20. Forecast = 140 + 10 = 150 kg (+7.1%)
  const projectedRaw = latestQty + rateOfChange * 0.5;
  const forecastQuantity = Math.max(1, Math.round(projectedRaw));

  // Percentage change from the most recent historical period
  const changePercentage =
    latestQty > 0
      ? Math.round(((forecastQuantity - latestQty) / latestQty) * 1000) / 10
      : 0;

  // Determine trend direction
  let trend: DemandTrend = "stable";
  if (changePercentage > 2) {
    trend = "increasing";
  } else if (changePercentage < -2) {
    trend = "decreasing";
  }

  // Generate actionable farmer recommendation
  let recommendation = "";
  if (trend === "increasing") {
    recommendation = `Demand for ${productName} is expected to increase (+${changePercentage}%). Consider preparing additional supply and scheduling prompt farm-gate dispatch.`;
  } else if (trend === "decreasing") {
    recommendation = `Demand for ${productName} is projected to soften (${changePercentage}%). Consider staggered harvesting or engaging advance bulk buyer contracts to prevent excess storage.`;
  } else {
    recommendation = `Demand for ${productName} is steady. Maintain standard inventory listings and align with current APMC/e-NAM benchmark rates.`;
  }

  return {
    forecastQuantity,
    trend,
    changePercentage,
    recommendation,
    method: "Dampened Linear Trend Velocity (Deterministic Model)",
  };
}
