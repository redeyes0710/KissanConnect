import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DEMO_SUMMARY } from "@/lib/demoData";

export async function GET() {
  try {
    // Fetch all counts in parallel
    const [productsResult, ordersResult] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id, status, total_price", { count: "exact" }),
    ]);

    const productsError = productsResult.error;
    const ordersError = ordersResult.error;

    // If either query fails, fall back to demo summary
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
      (sum: number, o: { total_price: number }) => sum + (o.total_price ?? 0),
      0
    );
    const pendingOrders = orders.filter(
      (o: { status: string }) => o.status === "pending"
    ).length;
    const confirmedOrders = orders.filter(
      (o: { status: string }) => o.status === "confirmed"
    ).length;
    const completedOrders = orders.filter(
      (o: { status: string }) => o.status === "completed"
    ).length;

    // Farmer/buyer counts — best-effort; tables may not exist yet
    let totalFarmers = 0;
    let totalBuyers = 0;
    const farmersResult = await supabase
      .from("farmers")
      .select("id", { count: "exact", head: true });
    const buyersResult = await supabase
      .from("buyers")
      .select("id", { count: "exact", head: true });
    if (!farmersResult.error) totalFarmers = farmersResult.count ?? 0;
    if (!buyersResult.error) totalBuyers = buyersResult.count ?? 0;

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
  } catch (err) {
    console.error("[admin/summary] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve summary" },
      { status: 500 }
    );
  }
}
