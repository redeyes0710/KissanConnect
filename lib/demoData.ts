/**
 * Demo / fallback data for KISSAN Connect prototype.
 *
 * This data is used ONLY when the Supabase connection is unavailable or
 * the relevant table does not yet contain real data.
 *
 * Always returned with isDemoData: true so callers can distinguish synthetic
 * data from live database records.
 */

export const DEMO_PRODUCTS = [
  {
    id: "demo-product-1",
    name: "Tomato",
    category: "Vegetables",
    variety: "Grade A",
    description: "Fresh farm tomatoes, Grade A",
    price: 25,
    quantity: 500,
    unit: "kg",
    farmer_id: "demo-farmer-1",
    created_at: "2024-01-15T08:00:00Z",
  },
  {
    id: "demo-product-2",
    name: "Onion",
    category: "Vegetables",
    variety: "Red Onion",
    description: "Red onions, medium size",
    price: 18,
    quantity: 1000,
    unit: "kg",
    farmer_id: "demo-farmer-1",
    created_at: "2024-01-16T09:00:00Z",
  },
  {
    id: "demo-product-3",
    name: "Potato",
    category: "Vegetables",
    variety: "Regular Potato",
    description: "Fresh potatoes, washed and sorted",
    price: 20,
    quantity: 800,
    unit: "kg",
    farmer_id: "demo-farmer-2",
    created_at: "2024-01-17T10:00:00Z",
  },
  {
    id: "demo-product-4",
    name: "Wheat",
    category: "Grains",
    variety: "Whole Wheat",
    description: "Whole wheat grain",
    price: 22,
    quantity: 2000,
    unit: "kg",
    farmer_id: "demo-farmer-2",
    created_at: "2024-01-18T11:00:00Z",
  },
  {
    id: "demo-product-5",
    name: "Rice",
    category: "Grains",
    variety: "Basmati",
    description: "Basmati rice, premium quality",
    price: 55,
    quantity: 1500,
    unit: "kg",
    farmer_id: "demo-farmer-3",
    created_at: "2024-01-19T12:00:00Z",
  },

  // Additional demo products for category, variety and search testing
  {
    id: "demo-product-6",
    name: "Mango",
    category: "Fruits",
    variety: "Hapus",
    description: "Fresh Hapus mangoes",
    price: 120,
    quantity: 300,
    unit: "kg",
    farmer_id: "demo-farmer-1",
    created_at: "2024-01-20T08:00:00Z",
  },
  {
    id: "demo-product-7",
    name: "Mango",
    category: "Fruits",
    variety: "Langda",
    description: "Fresh Langda mangoes",
    price: 90,
    quantity: 250,
    unit: "kg",
    farmer_id: "demo-farmer-2",
    created_at: "2024-01-21T09:00:00Z",
  },
  {
    id: "demo-product-8",
    name: "Apple",
    category: "Fruits",
    variety: "Kashmiri Apple",
    description: "Fresh Kashmiri apples",
    price: 150,
    quantity: 400,
    unit: "kg",
    farmer_id: "demo-farmer-3",
    created_at: "2024-01-22T10:00:00Z",
  },
  {
    id: "demo-product-9",
    name: "Apple",
    category: "Fruits",
    variety: "Green Apple",
    description: "Fresh green apples",
    price: 140,
    quantity: 350,
    unit: "kg",
    farmer_id: "demo-farmer-1",
    created_at: "2024-01-23T11:00:00Z",
  },
  {
    id: "demo-product-10",
    name: "Sweet Potato",
    category: "Vegetables",
    variety: "Sweet Potato",
    description: "Fresh sweet potatoes",
    price: 35,
    quantity: 600,
    unit: "kg",
    farmer_id: "demo-farmer-2",
    created_at: "2024-01-24T12:00:00Z",
  },
];

export const DEMO_ORDERS = [
  {
    id: "demo-order-1",
    product_id: "demo-product-1",
    buyer_id: "demo-buyer-1",
    farmer_id: "demo-farmer-1",
    quantity: 50,
    total_price: 1250,
    status: "completed",
    created_at: "2024-01-20T08:00:00Z",
  },
  {
    id: "demo-order-2",
    product_id: "demo-product-2",
    buyer_id: "demo-buyer-2",
    farmer_id: "demo-farmer-1",
    quantity: 100,
    total_price: 1800,
    status: "completed",
    created_at: "2024-01-21T09:00:00Z",
  },
  {
    id: "demo-order-3",
    product_id: "demo-product-3",
    buyer_id: "demo-buyer-1",
    farmer_id: "demo-farmer-2",
    quantity: 200,
    total_price: 4000,
    status: "pending",
    created_at: "2024-01-22T10:00:00Z",
  },
  {
    id: "demo-order-4",
    product_id: "demo-product-4",
    buyer_id: "demo-buyer-3",
    farmer_id: "demo-farmer-2",
    quantity: 500,
    total_price: 11000,
    status: "pending",
    created_at: "2024-01-23T11:00:00Z",
  },
  {
    id: "demo-order-5",
    product_id: "demo-product-5",
    buyer_id: "demo-buyer-2",
    farmer_id: "demo-farmer-3",
    quantity: 300,
    total_price: 16500,
    status: "confirmed",
    created_at: "2024-01-24T12:00:00Z",
  },
];

export const DEMO_SUMMARY = {
  totalProducts: DEMO_PRODUCTS.length,
  totalOrders: DEMO_ORDERS.length,
  totalRevenue: DEMO_ORDERS.reduce(
    (sum, o) => sum + o.total_price,
    0
  ),
  pendingOrders: DEMO_ORDERS.filter(
    (o) => o.status === "pending"
  ).length,
  confirmedOrders: DEMO_ORDERS.filter(
    (o) => o.status === "confirmed"
  ).length,
  completedOrders: DEMO_ORDERS.filter(
    (o) => o.status === "completed"
  ).length,
  totalFarmers: 3,
  totalBuyers: 3,
};