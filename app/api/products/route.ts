import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DEMO_PRODUCTS } from "@/lib/demoData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const farmer_id = searchParams.get("farmer_id");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const variety = searchParams.get("variety");

  try {
    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    // Filter by farmer
    if (farmer_id) {
      query = query.eq("farmer_id", farmer_id);
    }

    // Search product name, category or variety
    if (search) {
      const searchTerm = search.replace(/,/g, " ");

      query = query.or(
        `name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,variety.ilike.%${searchTerm}%`
      );
    }

    // Filter by category
    if (category) {
      query = query.ilike("category", category);
    }

    // Filter by variety
    if (variety) {
      query = query.ilike("variety", `%${variety}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.warn(
        "[products GET] Supabase error, using demo fallback:",
        error.message
      );

      let fallback = DEMO_PRODUCTS;

      // Farmer filter
      if (farmer_id) {
        fallback = fallback.filter(
          (product) => product.farmer_id === farmer_id
        );
      }

      // Search name, category or variety
      if (search) {
        const searchTerm = search.toLowerCase();

        fallback = fallback.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.variety.toLowerCase().includes(searchTerm)
        );
      }

      // Category filter
      if (category) {
        fallback = fallback.filter(
          (product) =>
            product.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Variety filter
      if (variety) {
        const varietyTerm = variety.toLowerCase();

        fallback = fallback.filter((product) =>
          product.variety.toLowerCase().includes(varietyTerm)
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
      category,
      variety,
      description,
      price,
      quantity,
      unit,
      farmer_id,
    } = body;

    // Required field validation
    if (
      !name ||
      !category ||
      !variety ||
      price == null ||
      quantity == null ||
      !unit
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "name, category, variety, price, quantity and unit are required",
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
          category,
          variety,
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