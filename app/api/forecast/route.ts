import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { calculateDemandForecast, HistoricalDemandPoint } from "@/lib/forecast";
import { getDemoDemandData } from "@/lib/seedData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productQuery = searchParams.get("product") || searchParams.get("name");
    const productId = searchParams.get("productId") || searchParams.get("id");

    // 1. Validation: ensure at least one identifier is provided
    if (!productQuery && !productId) {
      return NextResponse.json(
        {
          success: false,
          error: "Product name or productId query parameter is required (e.g. /api/forecast?product=Tomato)",
        },
        { status: 400 }
      );
    }

    let productName = productQuery ? productQuery.trim() : "";
    let unit = "kg";
    let historicalData: HistoricalDemandPoint[] = [];
    let isRealData = false;

    // 2. If productId provided, attempt to look up product details from Supabase
    if (productId && !productName) {
      try {
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("name, unit")
          .eq("id", productId)
          .single();

        if (!productError && productData) {
          productName = productData.name;
          unit = productData.unit || unit;
        }
      } catch {
        // Continue to fallback if Supabase lookup encounters an issue
      }
    }

    // 3. Attempt to fetch real historical order data from Supabase
    if (productName || productId) {
      try {
        let query = supabase.from("orders").select("quantity, created_at, unit");

        if (productId) {
          query = query.eq("product_id", productId);
        } else if (productName) {
          query = query.ilike("product_name", `%${productName}%`);
        }

        const { data: orderRows, error: orderError } = await query.order("created_at", { ascending: true });

        if (!orderError && orderRows && orderRows.length >= 2) {
          // Group or bucket orders into historical points
          historicalData = orderRows.map((row, idx) => ({
            period: `Order Batch ${idx + 1}`,
            quantity: Number(row.quantity) || 0,
          }));
          if (orderRows[0].unit) {
            unit = orderRows[0].unit;
          }
          isRealData = true;
        }
      } catch {
        // Fall back gracefully if orders table is not yet migrated or unreachable
      }
    }

    // 4. If insufficient or no real historical data, use verified prototype demo seed data
    if (!isRealData || historicalData.length === 0) {
      const demoRecord = getDemoDemandData(productName);

      if (!demoRecord) {
        return NextResponse.json(
          {
            success: false,
            error: `No historical or demo demand data available for product '${productName || productId}'.`,
            availableDemoCrops: ["Tomato", "Sharbati Wheat", "Red Onion", "Potato", "Mustard Seed"],
          },
          { status: 404 }
        );
      }

      productName = demoRecord.product;
      unit = demoRecord.unit;
      historicalData = demoRecord.historicalData;
    }

    // 5. Execute deterministic demand calculation
    const forecast = calculateDemandForecast(historicalData, productName, unit);

    // 6. Return standard structured response
    return NextResponse.json(
      {
        success: true,
        product: productName,
        forecastQuantity: forecast.forecastQuantity,
        unit,
        trend: forecast.trend,
        changePercentage: forecast.changePercentage,
        recommendation: forecast.recommendation,
        method: forecast.method,
        isDemoData: !isRealData,
        dataSource: isRealData ? "Live Supabase Orders" : "Prototype estimate • Demo data",
        historicalData,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to calculate demand forecast due to an internal calculation error.",
      },
      { status: 500 }
    );
  }
}
