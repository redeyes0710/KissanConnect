/**
 * Products API unit tests — KissanConnect
 *
 * Run with: npx jest tests/products.test.ts
 *
 * NOTE: These tests mock Supabase to run without a live database connection.
 */

import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Mock Supabase before importing the route so it never calls the real DB
// ---------------------------------------------------------------------------
let mockInsertResult: { data: unknown; error: unknown } = { data: null, error: null };
let mockSelectResult: { data: unknown; error: unknown } = { data: [], error: null };

jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      ilike: jest.fn().mockReturnThis(),
      single: jest.fn().mockImplementation(() => mockInsertResult),
      then: jest.fn(),
    }),
  },
}));

// We import after mock setup
import { GET, POST } from "@/app/api/products/route";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeRequest(method: string, body?: unknown): NextRequest {
  return new NextRequest("http://localhost/api/products", {
    method,
    ...(body ? { body: JSON.stringify(body), headers: { "Content-Type": "application/json" } } : {}),
  });
}

// ---------------------------------------------------------------------------
// GET tests
// ---------------------------------------------------------------------------
describe("GET /api/products", () => {
  it("returns success:true with products array", async () => {
    const mockProducts = [{ id: "1", name: "Tomato", price: 25, quantity: 100, unit: "kg" }];
    mockSelectResult = { data: mockProducts, error: null };

    // Re-mock to return select data
    const { supabase } = await import("@/lib/supabase");
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockProducts, error: null }),
      eq: jest.fn().mockReturnThis(),
      ilike: jest.fn().mockReturnThis(),
    });

    const req = new NextRequest("http://localhost/api/products");
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.products)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// POST tests
// ---------------------------------------------------------------------------
describe("POST /api/products", () => {
  beforeEach(() => {
    mockInsertResult = { data: null, error: null };
  });

  it("rejects missing required fields", async () => {
    const req = makeRequest("POST", { name: "Tomato" }); // missing price, quantity, unit
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/required/i);
  });

  it("rejects price <= 0", async () => {
    const req = makeRequest("POST", { name: "Tomato", price: -5, quantity: 100, unit: "kg" });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/price/i);
  });

  it("rejects quantity <= 0", async () => {
    const req = makeRequest("POST", { name: "Tomato", price: 25, quantity: 0, unit: "kg" });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/quantity/i);
  });

  it("accepts a valid product", async () => {
    const created = { id: "abc", name: "Tomato", price: 25, quantity: 100, unit: "kg" };
    mockInsertResult = { data: created, error: null };

    const { supabase } = await import("@/lib/supabase");
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: created, error: null }),
    });

    const req = makeRequest("POST", { name: "Tomato", price: 25, quantity: 100, unit: "kg" });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.product.name).toBe("Tomato");
  });

  it("rejects non-JSON body", async () => {
    const req = new NextRequest("http://localhost/api/products", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });
});
