-- Add category and variety support to products

ALTER TABLE products
ADD COLUMN IF NOT EXISTS category TEXT;

ALTER TABLE products
ADD COLUMN IF NOT EXISTS variety TEXT;

CREATE INDEX IF NOT EXISTS idx_products_category
ON products(category);

CREATE INDEX IF NOT EXISTS idx_products_variety
ON products(variety);