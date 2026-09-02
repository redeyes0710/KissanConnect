import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { count: productsCount, error: productsError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (productsError) {
      return NextResponse.json(
        {
          success: false,
          error: productsError.message,
        },
        { status: 500 }
      );
    }

    const { count: ordersCount, error: ordersError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    if (ordersError) {
      return NextResponse.json(
        {
          success: false,
          error: ordersError.message,
        },
        { status: 500 }
      );
    }

    const { data: orders, error: revenueError } = await supabase
      .from("orders")
      .select("total_price");

    if (revenueError) {
      return NextResponse.json(
        {
          success: false,
          error: revenueError.message,
        },
        { status: 500 }
      );
    }

    const totalRevenue =
      orders?.reduce(
        (total, order) => total + Number(order.total_price || 0),
        0
      ) || 0;

    return NextResponse.json({
      success: true,
      summary: {
        total_products: productsCount || 0,
        total_orders: ordersCount || 0,
        total_revenue: totalRevenue,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load admin summary",
      },
      { status: 500 }
    );
  }
}