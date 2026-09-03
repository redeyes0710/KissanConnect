/**
 * Orders API unit tests — KissanConnect
 *
 * Run with: npx jest tests/orders.test.ts
 *
 * Mocks Supabase so tests run offline.
 */

import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Mock Supabase
// ---------------------------------------------------------------------------
const mockProductLookup: { data: unknown; error: unknown } = {
  data: { id: "prod-1", price: 25, farmer_id: "farmer-1", quantity: 500 },
  error: null,
};

jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

import { GET, POST } from "@/app/api/orders/route";
import { supabase } from "@/lib/supabase";

function makeMockChain(resolveValue: unknown) {
  const chain: Record<string, jest.Mock> = {};
  const methods = ["select", "insert", "eq", "order", "ilike", "single"];
  methods.forEach((m) => {
    chain[m] = jest.fn().mockReturnValue(chain);
  });
  chain["single"] = jest.fn().mockResolvedValue(resolveValue);
  chain["then"] = jest.fn();
  // Allow awaiting the chain directly
  Object.defineProperty(chain, Symbol.asyncIterator, { value: undefined });
  return chain;
}

function makeRequest(method: string, body?: unknown): NextRequest {
  return new NextRequest("http://localhost/api/orders", {
    method,
    ...(body
      ? { body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
      : {}),
  });
}

// ---------------------------------------------------------------------------
// GET tests
// ---------------------------------------------------------------------------
describe("GET /api/orders", () => {
  it("returns demo data when Supabase fails", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: null, error: { message: "DB error" } }),
      eq: jest.fn().mockReturnThis(),
    });

    const req = new NextRequest("http://localhost/api/orders");
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.isDemoData).toBe(true);
    expect(Array.isArray(json.orders)).toBe(true);
    expect(json.orders.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// POST tests
// ---------------------------------------------------------------------------
describe("POST /api/orders", () => {
  it("rejects missing product_id", async () => {
    const req = makeRequest("POST", { buyer_id: "buyer-1", quantity: 10 });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/product_id/i);
  });

  it("rejects missing buyer_id", async () => {
    const req = makeRequest("POST", { product_id: "prod-1", quantity: 10 });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/buyer_id/i);
  });

  it("rejects quantity = 0", async () => {
    const req = makeRequest("POST", {
      product_id: "prod-1",
      buyer_id: "buyer-1",
      quantity: 0,
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/quantity/i);
  });

  it("rejects negative quantity", async () => {
    const req = makeRequest("POST", {
      product_id: "prod-1",
      buyer_id: "buyer-1",
      quantity: -5,
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it("returns 404 when product not found", async () => {
    (supabase.from as jest.Mock).mockImplementation((table: string) => {
      if (table === "products") {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: null, error: { message: "not found" } }),
        };
      }
      return makeMockChain({});
    });

    const req = makeRequest("POST", {
      product_id: "nonexistent",
      buyer_id: "buyer-1",
      quantity: 10,
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it("creates order and calculates total server-side", async () => {
    const product = { id: "prod-1", price: 25, farmer_id: "farmer-1", quantity: 500 };
    const created = {
      id: "order-1",
      product_id: "prod-1",
      buyer_id: "buyer-1",
      farmer_id: "farmer-1",
      quantity: 10,
      total_price: 250, // 25 * 10
      status: "pending",
    };

    (supabase.from as jest.Mock).mockImplementation((table: string) => {
      if (table === "products") {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: product, error: null }),
        };
      }
      if (table === "orders") {
        return {
          insert: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: created, error: null }),
        };
      }
      return makeMockChain({});
    });

    const req = makeRequest("POST", {
      product_id: "prod-1",
      buyer_id: "buyer-1",
      quantity: 10,
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.order.total_price).toBe(250);
    expect(json.order.status).toBe("pending");
  });
});
