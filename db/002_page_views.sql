CREATE TABLE IF NOT EXISTS "page_views" (
  "id" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "referrer" TEXT,
  "utm_source" TEXT,
  "utm_medium" TEXT,
  "utm_campaign" TEXT,
  "device" TEXT,
  "browser" TEXT,
  "country" TEXT,
  "session_id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "page_views_path_idx" ON "page_views"("path");
CREATE INDEX IF NOT EXISTS "page_views_createdAt_idx" ON "page_views"("createdAt");
CREATE INDEX IF NOT EXISTS "page_views_session_id_idx" ON "page_views"("session_id");
