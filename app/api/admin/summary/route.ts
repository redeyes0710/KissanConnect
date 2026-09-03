import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DEMO_SUMMARY } from "@/lib/demoData";

export async function GET() {
  try {
    // Fetch product and order data
    const [productsResult, ordersResult] = await Promise.all([
      supabase
        .from("products")
        .select("id", { count: "exact", head: true }),

      supabase
        .from("orders")
        .select("id, status, total_price", { count: "exact" }),
    ]);

    const productsError = productsResult.error;
    const ordersError = ordersResult.error;

    // Use demo data if Supabase is unavailable
    if (productsError || ordersError) {
      console.warn(
        "[admin/summary] Supabase error, using demo fallback:",
        productsError?.message ?? ordersError?.message
      );

      return NextResponse.json({
        success: true,
        ...DEMO_SUMMARY,
        isDemoData: true,
        dataSource: "Demo fallback — Supabase unavailable",
      });
    }

    const totalProducts = productsResult.count ?? 0;
    const orders = ordersResult.data ?? [];
    const totalOrders = ordersResult.count ?? 0;

    const totalRevenue = orders.reduce(
      (sum: number, order: { total_price: number }) =>
        sum + (order.total_price ?? 0),
      0
    );

    const pendingOrders = orders.filter(
      (order: { status: string }) =>
        order.status === "pending"
    ).length;

    const confirmedOrders = orders.filter(
      (order: { status: string }) =>
        order.status === "confirmed"
    ).length;

    const completedOrders = orders.filter(
      (order: { status: string }) =>
        order.status === "completed"
    ).length;

    // Farmer and buyer counts
    let totalFarmers = 0;
    let totalBuyers = 0;

    const farmersResult = await supabase
      .from("farmers")
      .select("id", { count: "exact", head: true });

    const buyersResult = await supabase
      .from("buyers")
      .select("id", { count: "exact", head: true });

    if (!farmersResult.error) {
      totalFarmers = farmersResult.count ?? 0;
    }

    if (!buyersResult.error) {
      totalBuyers = buyersResult.count ?? 0;
    }

    return NextResponse.json({
      success: true,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      confirmedOrders,
      completedOrders,
      totalFarmers,
      totalBuyers,
      isDemoData: false,
    });
  } catch (error) {
    console.error(
      "[admin/summary] Unexpected error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve summary",
      },
      { status: 500 }
    );
  }
}