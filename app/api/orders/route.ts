import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
<<<<<<< HEAD

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
=======
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
>>>>>>> origin/feature/backend-completion
    }

    return NextResponse.json({
      success: true,
<<<<<<< HEAD
      orders: ordersWithProducts,
    });
  } catch (error) {
    console.error("GET ORDERS EXCEPTION:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
=======
      orders: data ?? [],
      isDemoData: false,
    });
  } catch (err) {
    console.error("[orders GET] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve orders" },
>>>>>>> origin/feature/backend-completion
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/feature/backend-completion
        { status: 400 }
      );
    }

<<<<<<< HEAD
    // Check that product exists
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name, price, quantity, farmer_id")
=======
    // --- Verify product exists and calculate total server-side ---
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, price, farmer_id, quantity")
>>>>>>> origin/feature/backend-completion
      .eq("id", product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
<<<<<<< HEAD
        {
          success: false,
          error: "Product not found",
        },
=======
        { success: false, error: "Product not found" },
>>>>>>> origin/feature/backend-completion
        { status: 404 }
      );
    }

<<<<<<< HEAD
    // Check available quantity
    if (Number(quantity) > Number(product.quantity)) {
      return NextResponse.json(
        {
          success: false,
          error: "Not enough product quantity available",
=======
    if (quantity > product.quantity) {
      return NextResponse.json(
        {
          success: false,
          error: `Requested quantity (${quantity}) exceeds available stock (${product.quantity})`,
>>>>>>> origin/feature/backend-completion
        },
        { status: 400 }
      );
    }

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/feature/backend-completion
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/feature/backend-completion
