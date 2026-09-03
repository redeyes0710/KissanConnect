/**
 * Admin Summary API unit tests — KissanConnect
 *
 * Run with: npx jest tests/summary.test.ts
 *
 * Mocks Supabase to run offline.
 */

import { NextRequest } from "next/server";
import { DEMO_SUMMARY } from "@/lib/demoData";

// ---------------------------------------------------------------------------
// Mock Supabase before importing route
// ---------------------------------------------------------------------------
jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

import { GET } from "@/app/api/admin/summary/route";
import { supabase } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeCountChain(count: number | null, error: unknown = null) {
  return {
    select: jest.fn().mockResolvedValue({ count, error, data: null }),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("GET /api/admin/summary", () => {
  it("returns demo data with isDemoData:true when Supabase fails", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({
        count: null,
        data: null,
        error: { message: "connection failed" },
      }),
    });

    const req = new NextRequest("http://localhost/api/admin/summary");
    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.isDemoData).toBe(true);
    expect(json.totalProducts).toBe(DEMO_SUMMARY.totalProducts);
    expect(json.totalOrders).toBe(DEMO_SUMMARY.totalOrders);
    expect(json.totalRevenue).toBe(DEMO_SUMMARY.totalRevenue);
  });

  it("returns live data with isDemoData:false when Supabase succeeds", async () => {
    const orders = [
      { id: "o1", status: "pending", total_price: 500 },
      { id: "o2", status: "completed", total_price: 1000 },
    ];

    (supabase.from as jest.Mock).mockImplementation((table: string) => {
      if (table === "products") {
        return { select: jest.fn().mockResolvedValue({ count: 5, data: null, error: null }) };
      }
      if (table === "orders") {
        return {
          select: jest.fn().mockResolvedValue({ count: 2, data: orders, error: null }),
        };
      }
      if (table === "farmers") {
        return { select: jest.fn().mockResolvedValue({ count: 3, data: null, error: null }) };
      }
      if (table === "buyers") {
        return { select: jest.fn().mockResolvedValue({ count: 4, data: null, error: null }) };
      }
      return { select: jest.fn().mockResolvedValue({ count: 0, data: null, error: null }) };
    });

    const req = new NextRequest("http://localhost/api/admin/summary");
    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.isDemoData).toBe(false);
    expect(json.totalProducts).toBe(5);
    expect(json.totalOrders).toBe(2);
    expect(json.totalRevenue).toBe(1500);
    expect(json.pendingOrders).toBe(1);
    expect(json.completedOrders).toBe(1);
  });

  it("response always includes all required metric keys", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ count: null, data: null, error: { message: "err" } }),
    });

    const req = new NextRequest("http://localhost/api/admin/summary");
    const res = await GET();
    const json = await res.json();

    const requiredKeys = [
      "success", "totalProducts", "totalOrders", "totalRevenue",
      "pendingOrders", "confirmedOrders", "completedOrders",
      "totalFarmers", "totalBuyers", "isDemoData",
    ];
    for (const key of requiredKeys) {
      expect(json).toHaveProperty(key);
    }
  });
});
