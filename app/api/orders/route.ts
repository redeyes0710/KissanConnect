import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/orders
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orders: data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

// POST /api/orders
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      product_id,
      buyer_id,
      quantity,
      total_price,
      status = "pending",
    } = body;

    if (!product_id || !quantity || total_price === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "product_id, quantity and total_price are required",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id,
          buyer_id: buyer_id || null,
          quantity,
          total_price,
          status,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order: data,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body",
      },
      { status: 400 }
    );
  }
}