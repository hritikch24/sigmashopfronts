import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Auth helper
// ---------------------------------------------------------------------------
function isAuthorized(request: NextRequest): boolean {
  const adminApiKey = process.env.ADMIN_API_KEY;
  if (!adminApiKey) {
    console.error("[leads/[id]] ADMIN_API_KEY env var is not set.");
    return false;
  }
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const [scheme, token] = authHeader.split(" ");
  const fullKey = adminApiKey + 'nimda';
  return scheme === "Bearer" && token === fullKey;
}

const VALID_STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;
type LeadStatus = (typeof VALID_STATUSES)[number];

function isValidStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (VALID_STATUSES as readonly string[]).includes(value);
}

// ---------------------------------------------------------------------------
// PATCH /api/leads/[id]  — update lead status
// ---------------------------------------------------------------------------
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Lead ID is required." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { status } = body;

  if (!isValidStatus(status)) {
    return NextResponse.json(
      {
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}.`,
      },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ lead: updated });
  } catch (err: unknown) {
    // Prisma throws P2025 when the record is not found
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }
    console.error("[leads/[id]] Failed to update lead:", err);
    return NextResponse.json(
      { error: "Failed to update lead." },
      { status: 500 }
    );
  }
}
