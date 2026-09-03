import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DEMO_PRODUCTS } from "@/lib/demoData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const farmer_id = searchParams.get("farmer_id");
  const search = searchParams.get("search");

  try {
    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (farmer_id) {
      query = query.eq("farmer_id", farmer_id);
    }

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.warn(
        "[products GET] Supabase error, using demo fallback:",
        error.message
      );

      let fallback = DEMO_PRODUCTS;

      if (farmer_id) {
        fallback = fallback.filter(
          (product) => product.farmer_id === farmer_id
        );
      }

      if (search) {
        fallback = fallback.filter((product) =>
          product.name
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      return NextResponse.json({
        success: true,
        products: fallback,
        isDemoData: true,
        dataSource: "Demo fallback — Supabase unavailable",
      });
    }

    return NextResponse.json({
      success: true,
      products: data ?? [],
      isDemoData: false,
    });
  } catch (error) {
    console.error(
      "[products GET] Unexpected error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve products",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      price,
      quantity,
      unit,
      farmer_id,
    } = body;

    // Required field validation
    if (
      !name ||
      price == null ||
      quantity == null ||
      !unit
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "name, price, quantity and unit are required",
        },
        { status: 400 }
      );
    }

    // Numeric validation
    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "price must be a positive number",
        },
        { status: 400 }
      );
    }

    if (
      typeof quantity !== "number" ||
      quantity <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "quantity must be a positive number",
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
      console.error(
        "[products POST] Supabase insert error:",
        error.message
      );

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
  } catch (error) {
    console.error(
      "[products POST] Invalid request:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body",
      },
      { status: 400 }
    );
  }
}