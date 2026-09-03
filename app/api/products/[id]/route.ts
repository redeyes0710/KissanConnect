import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// UPDATE PRODUCT
export async function PATCH(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      name,
      description,
      price,
      quantity,
      unit,
    } = body;

    const updates: Record<string, any> = {};

    if (name !== undefined) {
      updates.name = name;
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (price !== undefined) {
      updates.price = Number(price);
    }

    if (quantity !== undefined) {
      updates.quantity = Number(quantity);
    }

    if (unit !== undefined) {
      updates.unit = unit;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No fields to update",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select("*");

    if (error) {
      console.error("Update product error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    // If Supabase returned no rows, the update was not allowed/found.
    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Product could not be updated. Check that the product exists and that UPDATE permission is enabled in Supabase RLS.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: data[0],
    });
  } catch (error) {
    console.error("PATCH product error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Invalid request",
      },
      { status: 400 }
    );
  }
}

// DELETE PRODUCT
export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select("*");

    if (error) {
      console.error("Delete product error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Product could not be deleted. Check that DELETE permission is enabled in Supabase RLS.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE product error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete product",
      },
      { status: 500 }
    );
  }
}