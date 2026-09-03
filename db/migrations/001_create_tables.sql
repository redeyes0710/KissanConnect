-- ============================================================
-- KISSAN Connect — Initial Database Schema
-- Run this SQL in your Supabase SQL Editor to create all tables.
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- Locations
-- Used by farmers (source) and buyers (delivery).
-- Compatible with Leaflet/OpenStreetMap integration.
-- ─────────────────────────────────────────────────────────────
create table if not exists locations (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  latitude    double precision not null,
  longitude   double precision not null,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Farmers / FPOs
-- ─────────────────────────────────────────────────────────────
create table if not exists farmers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text unique,
  phone       text,
  location_id uuid references locations(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Buyers
-- ─────────────────────────────────────────────────────────────
create table if not exists buyers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text unique,
  phone       text,
  location_id uuid references locations(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Products / Listings
-- ─────────────────────────────────────────────────────────────
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(10,2) not null check (price > 0),
  quantity    numeric(10,2) not null check (quantity > 0),
  unit        text not null,
  farmer_id   uuid references farmers(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Orders
-- ─────────────────────────────────────────────────────────────
create type if not exists order_status as enum (
  'pending',
  'confirmed',
  'completed',
  'canceled'
);

create table if not exists orders (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references products(id) on delete restrict,
  buyer_id    uuid references buyers(id) on delete set null,
  farmer_id   uuid references farmers(id) on delete set null,
  quantity    numeric(10,2) not null check (quantity > 0),
  total_price numeric(12,2) not null check (total_price >= 0),
  status      order_status not null default 'pending',
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Indexes for common query patterns
-- ─────────────────────────────────────────────────────────────
create index if not exists idx_products_farmer_id on products(farmer_id);
create index if not exists idx_orders_buyer_id    on orders(buyer_id);
create index if not exists idx_orders_farmer_id   on orders(farmer_id);
create index if not exists idx_orders_status      on orders(status);
create index if not exists idx_orders_created_at  on orders(created_at desc);

-- ─────────────────────────────────────────────────────────────
-- Row Level Security (RLS) placeholders
-- Adjust policies based on your Supabase auth setup.
-- ─────────────────────────────────────────────────────────────
alter table products enable row level security;
alter table orders   enable row level security;
alter table farmers  enable row level security;
alter table buyers   enable row level security;
alter table locations enable row level security;

-- Temporary open policy for prototype/demo (tighten before production)
create policy "Public read products"
  on products for select using (true);

create policy "Authenticated insert products"
  on products for insert with check (true);

create policy "Public read orders"
  on orders for select using (true);

create policy "Authenticated insert orders"
  on orders for insert with check (true);

create policy "Public read farmers"
  on farmers for select using (true);

create policy "Public read buyers"
  on buyers for select using (true);

create policy "Public read locations"
  on locations for select using (true);
