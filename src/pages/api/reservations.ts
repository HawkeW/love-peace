export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const id = `r-${Math.random().toString(36).slice(2)}`;
    const data = {
      id,
      clientName: String(body?.clientName || ""),
      phone: String(body?.phone || ""),
      date: String(body?.date || ""),
      packageId: String(body?.packageId || ""),
      status: "pending",
      note: String(body?.note || "")
    };
    return new Response(JSON.stringify(data), {
      status: 201,
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
  return new Response(JSON.stringify({ data: [], meta: { count: 0 } }), {
    headers: { "Content-Type": "application/json", "X-API-Version": "v1" }
  });
}

