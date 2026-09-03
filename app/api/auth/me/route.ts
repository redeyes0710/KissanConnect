import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/auth/me
 *
 * Reads the Authorization header (Bearer <access_token>) and returns
 * the current user's profile.
 *
 * Prototype endpoint — not production-grade.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "").trim();

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authorization token required" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  });
}
