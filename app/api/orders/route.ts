import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DEMO_ORDERS } from "@/lib/demoData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const buyer_id = searchParams.get("buyer_id");
  const farmer_id = searchParams.get("farmer_id");
  const status = searchParams.get("status");

  try {
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (buyer_id) query = query.eq("buyer_id", buyer_id);
    if (farmer_id) query = query.eq("farmer_id", farmer_id);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;

    if (error) {
      // Supabase unavailable — return labelled demo data
      console.warn("[orders GET] Supabase error, using demo fallback:", error.message);

      let fallback = DEMO_ORDERS;
      if (buyer_id) fallback = fallback.filter((o) => o.buyer_id === buyer_id);
      if (farmer_id) fallback = fallback.filter((o) => o.farmer_id === farmer_id);
      if (status) fallback = fallback.filter((o) => o.status === status);

      return NextResponse.json({
        success: true,
        orders: fallback,
        isDemoData: true,
        dataSource: "Demo fallback — Supabase unavailable",
      });
    }

    return NextResponse.json({
      success: true,
      orders: data ?? [],
      isDemoData: false,
    });
  } catch (err) {
    console.error("[orders GET] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, buyer_id, quantity } = body;

    // --- Required field validation ---
    if (!product_id) {
      return NextResponse.json(
        { success: false, error: "product_id is required" },
        { status: 400 }
      );
    }
    if (!buyer_id) {
      return NextResponse.json(
        { success: false, error: "buyer_id is required" },
        { status: 400 }
      );
    }
    if (quantity == null) {
      return NextResponse.json(
        { success: false, error: "quantity is required" },
        { status: 400 }
      );
    }
    if (typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json(
        { success: false, error: "quantity must be a positive number" },
        { status: 400 }
      );
    }

    // --- Verify product exists and calculate total server-side ---
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, price, farmer_id, quantity")
      .eq("id", product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    if (quantity > product.quantity) {
      return NextResponse.json(
        {
          success: false,
          error: `Requested quantity (${quantity}) exceeds available stock (${product.quantity})`,
        },
        { status: 400 }
      );
    }

    // Server-side total — never trust client value
    const total_price = product.price * quantity;

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id,
          buyer_id,
          farmer_id: product.farmer_id ?? null,
          quantity,
          total_price,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[orders POST] Supabase insert error:", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        order: data,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
