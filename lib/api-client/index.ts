const API_BASE = "";

export async function getProducts() {
  const response = await fetch(`${API_BASE}/api/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function createProduct(product: {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  unit: string;
  category?: string | null;
  variety?: string | null;
  farmer_id?: string | null;
}) {
  const response = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

export async function getOrders(
  userId?: string,
  role?: "farmer" | "buyer"
) {
  let url = `${API_BASE}/api/orders`;

  if (userId && role) {
    url += `?${
      role === "farmer" ? "farmer_id" : "buyer_id"
    }=${userId}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function createOrder(order: {
  product_id: string;
  buyer_id?: string | null;
  quantity: number;
  total_price: number;
  status?: string;
}) {
  const response = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}

export async function getAdminSummary() {
  const response = await fetch(`${API_BASE}/api/admin/summary`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin summary");
  }

  return response.json();
}