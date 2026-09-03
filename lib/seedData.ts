import { HistoricalDemandPoint } from "./forecast";

export interface DemoCropDemand {
  product: string;
  aliases: string[];
  unit: string;
  historicalData: HistoricalDemandPoint[];
  dataSource: string;
  isDemoData: boolean;
}

/**
 * Verified Synthetic Demo Datasets for Prototype Demonstration.
 * Clearly identified as demo data per KISAN Connect guidelines.
 */
export const DEMO_DEMAND_DATASETS: Record<string, DemoCropDemand> = {
  tomato: {
    product: "Tomato",
    aliases: ["tomato", "tamatar", "tomatoes"],
    unit: "kg",
    historicalData: [
      { period: "Week 1", quantity: 100 },
      { period: "Week 2", quantity: 120 },
      { period: "Week 3", quantity: 140 },
    ],
    dataSource: "Prototype estimate • Demo data",
    isDemoData: true,
  },
  wheat: {
    product: "Sharbati Wheat",
    aliases: ["wheat", "sharbati wheat", "gehun", "sharbati golden wheat"],
    unit: "Qtl",
    historicalData: [
      { period: "Week 1", quantity: 110 },
      { period: "Week 2", quantity: 120 },
      { period: "Week 3", quantity: 130 },
    ],
    dataSource: "Prototype estimate • Demo data",
    isDemoData: true,
  },
  onion: {
    product: "Red Onion",
    aliases: ["onion", "red onion", "pyaz", "onions"],
    unit: "Qtl",
    historicalData: [
      { period: "Week 1", quantity: 85 },
      { period: "Week 2", quantity: 95 },
      { period: "Week 3", quantity: 110 },
    ],
    dataSource: "Prototype estimate • Demo data",
    isDemoData: true,
  },
  potato: {
    product: "Potato",
    aliases: ["potato", "aloo", "potatoes"],
    unit: "kg",
    historicalData: [
      { period: "Week 1", quantity: 200 },
      { period: "Week 2", quantity: 195 },
      { period: "Week 3", quantity: 198 },
    ],
    dataSource: "Prototype estimate • Demo data",
    isDemoData: true,
  },
  mustard: {
    product: "Mustard Seed",
    aliases: ["mustard", "mustard seed", "sarson", "oilseed"],
    unit: "Qtl",
    historicalData: [
      { period: "Week 1", quantity: 80 },
      { period: "Week 2", quantity: 72 },
      { period: "Week 3", quantity: 65 },
    ],
    dataSource: "Prototype estimate • Demo data",
    isDemoData: true,
  },
};

/**
 * Look up demo demand data by product name or alias.
 */
export function getDemoDemandData(productQuery: string): DemoCropDemand | null {
  if (!productQuery) return null;
  const normalized = productQuery.trim().toLowerCase();

  for (const key of Object.keys(DEMO_DEMAND_DATASETS)) {
    const item = DEMO_DEMAND_DATASETS[key];
    if (
      item.product.toLowerCase() === normalized ||
      item.aliases.some((alias) => normalized.includes(alias) || alias.includes(normalized))
    ) {
      return item;
    }
  }

  return null;
}
