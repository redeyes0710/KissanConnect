import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("products")
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
    products: data,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, description, price, quantity, unit, farmer_id } = body;

    if (!name || price == null || quantity == null || !unit) {
      return NextResponse.json(
        {
          success: false,
          error: "name, price, quantity and unit are required",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description: description || null,
          price,
          quantity,
          unit,
          farmer_id: farmer_id || null,
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
        message: "Product added successfully",
        product: data,
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