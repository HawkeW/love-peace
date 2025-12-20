export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const accepted = ["CLS", "LCP", "FID", "INP", "TTFB"];
    const name = String(body?.name || "");
    const value = Number(body?.value || 0);
    const id = String(body?.id || "");
    const now = Date.now();
    const ok = accepted.includes(name) && Number.isFinite(value);
    const res = { status: ok ? "ok" : "ignored", receivedAt: now, id, name };
    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json", "X-API-Version": "v1" }
    });
  } catch {
    return new Response(JSON.stringify({ status: "error" }), {
      status: 400,
      headers: { "Content-Type": "application/problem+json", "X-API-Version": "v1" }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "Content-Type": "application/json", "X-API-Version": "v1" }
  });
}

