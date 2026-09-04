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

    // Only these status changes are allowed
    if (
      !status ||
      !["accepted", "rejected"].includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid status. Use accepted or rejected.",
        },
        { status: 400 }
      );
    }

    // Get the order
    const { data: order, error: orderError } =
      await supabase
        .from("orders")
        .select(`
          id,
          product_id,
          quantity,
          status
        `)
        .eq("id", id)
        .single();

    if (orderError || !order) {
      console.error(
        "Order lookup error:",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    // Only pending orders can be accepted/rejected
    if (order.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          error: `Order is already ${order.status}.`,
        },
        { status: 400 }
      );
    }

    /*
      IMPORTANT:

      The POST /api/orders route already reduces
      product quantity when the buyer places the order.

      Therefore:

      ACCEPTED:
        Do NOT reduce stock again.

      REJECTED:
        Restore the reserved quantity.
    */

    if (status === "rejected") {
      // Get current product quantity
      const { data: product, error: productError } =
        await supabase
          .from("products")
          .select("id, quantity")
          .eq("id", order.product_id)
          .single();

      if (productError || !product) {
        console.error(
          "Product lookup error:",
          productError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Product associated with this order was not found.",
          },
          { status: 404 }
        );
      }

      const currentQuantity =
        Number(product.quantity);

      const orderedQuantity =
        Number(order.quantity);

      const restoredQuantity =
        currentQuantity + orderedQuantity;

      // Restore reserved stock
      const { error: quantityError } =
        await supabase
          .from("products")
          .update({
            quantity: restoredQuantity,
          })
          .eq("id", order.product_id);

      if (quantityError) {
        console.error(
          "Failed to restore product quantity:",
          quantityError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Order could not be rejected because product quantity could not be restored.",
          },
          { status: 500 }
        );
      }
    }

    // Update the order status
    const {
      data: updatedOrder,
      error: updateError,
    } = await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id)
      .eq("status", "pending")
      .select()
      .single();

    if (updateError || !updatedOrder) {
      console.error(
        "Order status update error:",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            updateError?.message ||
            "Order status could not be updated.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        status === "accepted"
          ? "Order accepted successfully."
          : "Order rejected successfully. Product quantity restored.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(
      "Update order error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order.",
      },
      { status: 500 }
    );
  }
}