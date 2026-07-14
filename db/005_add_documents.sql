CREATE TABLE IF NOT EXISTS "documents" (
  "id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "number" TEXT NOT NULL,
  "customer_id" TEXT,
  "customer_name" TEXT NOT NULL,
  "customer_email" TEXT,
  "customer_phone" TEXT,
  "customer_address" TEXT,
  "line_items" JSONB NOT NULL,
  "subtotal" DOUBLE PRECISION NOT NULL,
  "vat_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "vat_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "total" DOUBLE PRECISION NOT NULL,
  "notes" TEXT,
  "valid_until" TIMESTAMP(3),
  "due_date" TIMESTAMP(3),
  "status" TEXT NOT NULL DEFAULT 'draft',
  "paid_at" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "documents_number_key" ON "documents"("number");
CREATE INDEX IF NOT EXISTS "documents_type_idx" ON "documents"("type");
CREATE INDEX IF NOT EXISTS "documents_customer_id_idx" ON "documents"("customer_id");
CREATE INDEX IF NOT EXISTS "documents_createdAt_idx" ON "documents"("createdAt");

ALTER TABLE "documents"
  ADD CONSTRAINT "documents_customer_id_fkey"
  FOREIGN KEY ("customer_id") REFERENCES "customers"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
