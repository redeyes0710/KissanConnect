import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { status } = body;

    if (!status || !["accepted", "rejected"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status",
        },
        { status: 400 }
      );
    }

    // Get the order and product information
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, product_id, quantity, status")
      .eq("id", id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    // Prevent processing the same order twice
    if (order.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          error: `Order is already ${order.status}`,
        },
        { status: 400 }
      );
    }

    // If farmer accepts the order, reduce product quantity
    if (status === "accepted") {
      const { data: product, error: productError } =
        await supabase
          .from("products")
          .select("id, quantity")
          .eq("id", order.product_id)
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

      const currentQuantity = Number(product.quantity);
      const orderedQuantity = Number(order.quantity);

      if (orderedQuantity > currentQuantity) {
        return NextResponse.json(
          {
            success: false,
            error: "Not enough product quantity available",
          },
          { status: 400 }
        );
      }

      const newQuantity =
        currentQuantity - orderedQuantity;

      const { error: quantityError } = await supabase
        .from("products")
        .update({
          quantity: newQuantity,
        })
        .eq("id", order.product_id);

      if (quantityError) {
        console.error(
          "Product quantity update error:",
          quantityError
        );

        return NextResponse.json(
          {
            success: false,
            error: quantityError.message,
          },
          { status: 500 }
        );
      }
    }

    // Update order status
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);

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
      message: `Order ${status} successfully`,
      order: data,
    });
  } catch (error) {
    console.error("Update order error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order",
      },
      { status: 500 }
    );
  }
}