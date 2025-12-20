export async function GET({ params }: { params: { id: string } }) {
  const id = params.id || "inv1";
  const data = { id, title: "电子请柬", status: "draft" };
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json", "X-API-Version": "v1" }
  });
}

