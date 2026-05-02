CREATE TABLE IF NOT EXISTS "_migrations" (
  "name" TEXT NOT NULL,
  "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "_migrations_pkey" PRIMARY KEY ("name")
);
