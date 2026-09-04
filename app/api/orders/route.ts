import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DEMO_ORDERS } from "@/lib/demoData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const buyerId = searchParams.get("buyer_id");
    const farmerId = searchParams.get("farmer_id");
    const status = searchParams.get("status");

    let query = supabase
      .from("orders")
      .select(`
        *,
        products (
          name,
          price,
          unit,
          farmer_id
        )
      `)
      .order("created_at", { ascending: false });

    if (buyerId) {
      query = query.eq("buyer_id", buyerId);
    }

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.warn(
        "[orders] Supabase error, using demo fallback:",
        error.message
      );

      return NextResponse.json({
        success: true,
        orders: DEMO_ORDERS,
        isDemoData: true,
      });
    }

    let orders = data || [];

    // Filter by farmer through the related product
    if (farmerId) {
      orders = orders.filter(
        (order: any) =>
          order.products?.farmer_id === farmerId
      );
    }

    // Add convenient product fields
    orders = orders.map((order: any) => ({
      ...order,
      product_name: order.products?.name,
      product_price: order.products?.price,
      product_unit: order.products?.unit,
    }));

    return NextResponse.json({
      success: true,
      orders,
      isDemoData: false,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return NextResponse.json({
      success: true,
      orders: DEMO_ORDERS,
      isDemoData: true,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      product_id,
      buyer_id,
      quantity,
      total_price,
    } = body;

    if (
      !product_id ||
      !buyer_id ||
      !quantity ||
      quantity <= 0 ||
      total_price === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid order details",
        },
        { status: 400 }
      );
    }

    // Get the product first
    const { data: product, error: productError } =
      await supabase
        .from("products")
        .select("*")
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

    // Make sure enough stock is available
    if (Number(product.quantity) < Number(quantity)) {
      return NextResponse.json(
        {
          success: false,
          error: `Only ${product.quantity} ${product.unit} available.`,
        },
        { status: 400 }
      );
    }

    // Calculate the total on the server
    const calculatedTotal =
      Number(product.price) * Number(quantity);

    // Calculate remaining stock
    const remainingQuantity =
      Number(product.quantity) - Number(quantity);

    // Create the order
    const { data: order, error: orderError } =
      await supabase
        .from("orders")
        .insert({
          product_id,
          buyer_id,
          quantity,
          total_price: calculatedTotal,
          status: "pending",
        })
        .select()
        .single();

    if (orderError) {
      console.error(
        "Order creation error:",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          error: orderError.message,
        },
        { status: 500 }
      );
    }

    // Reduce product stock
    const { error: updateError } = await supabase
      .from("products")
      .update({
        quantity: remainingQuantity,
      })
      .eq("id", product_id);

    if (updateError) {
      console.error(
        "Stock update error:",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Order was created but product stock could not be updated.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order,
      remainingQuantity,
    });
  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 }
    );
  }
}