import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const farmerId = searchParams.get("farmer_id");
    const buyerId = searchParams.get("buyer_id");

    let query = supabase
      .from("orders")
      .select(
        "id, product_id, buyer_id, quantity, total_price, status, created_at"
      )
      .order("created_at", { ascending: false });

    // Filter by buyer if provided
    if (buyerId) {
      query = query.eq("buyer_id", buyerId);
    }

    const { data: orders, error: ordersError } = await query;

    if (ordersError) {
      console.error("GET ORDERS ERROR:", ordersError);

      return NextResponse.json(
        {
          success: false,
          error: ordersError.message,
        },
        { status: 500 }
      );
    }

    // Get products
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, price, unit, farmer_id");

    if (productsError) {
      console.error("GET PRODUCTS ERROR:", productsError);

      return NextResponse.json(
        {
          success: false,
          error: productsError.message,
        },
        { status: 500 }
      );
    }

    // Add product information to orders
    let ordersWithProducts = (orders || []).map((order) => {
      const product = (products || []).find(
        (product) => product.id === order.product_id
      );

      return {
        ...order,
        product_name: product?.name || "Unknown Product",
        product_price: product?.price ?? null,
        product_unit: product?.unit || null,
        farmer_id: product?.farmer_id || null,
      };
    });

    // Filter by farmer
    if (farmerId) {
      ordersWithProducts = ordersWithProducts.filter(
        (order) => order.farmer_id === farmerId
      );
    }

    return NextResponse.json({
      success: true,
      orders: ordersWithProducts,
    });
  } catch (error) {
    console.error("GET ORDERS EXCEPTION:", error);

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
      status,
    } = body;

    if (!product_id) {
      return NextResponse.json(
        {
          success: false,
          error: "product_id is required",
        },
        { status: 400 }
      );
    }

    if (!quantity || Number(quantity) <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "quantity must be greater than 0",
        },
        { status: 400 }
      );
    }

    if (total_price === undefined || total_price === null) {
      return NextResponse.json(
        {
          success: false,
          error: "total_price is required",
        },
        { status: 400 }
      );
    }

    // Check that product exists
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name, price, quantity, farmer_id")
      .eq("id", product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    // Check available quantity
    if (Number(quantity) > Number(product.quantity)) {
      return NextResponse.json(
        {
          success: false,
          error: "Not enough product quantity available",
        },
        { status: 400 }
      );
    }

    // Create order
    const { data, error } = await supabase
      .from("orders")
      .insert({
        product_id,
        buyer_id: buyer_id || null,
        quantity: Number(quantity),
        total_price: Number(total_price),
        status: status || "pending",
      })
      .select(
        "id, product_id, buyer_id, quantity, total_price, status, created_at"
      )
      .single();

    if (error) {
      console.error("CREATE ORDER ERROR:", error);

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
        order: {
          ...data,
          product_name: product.name,
          product_price: product.price,
          farmer_id: product.farmer_id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE ORDER EXCEPTION:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body",
      },
      { status: 400 }
    );
  }
}