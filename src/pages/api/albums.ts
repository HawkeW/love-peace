export async function GET() {
  const data = [
    { id: "a1", title: "法式轻奢", categoryId: "outdoor", coverImage: "/images/a1.jpg" },
    { id: "a2", title: "森系自然", categoryId: "outdoor", coverImage: "/images/a2.jpg" },
    { id: "a3", title: "室内复古", categoryId: "indoor", coverImage: "/images/a3.jpg" }
  ];
  return new Response(JSON.stringify({ data, meta: { count: data.length } }), {
    headers: { "Content-Type": "application/json", "X-API-Version": "v1" }
  });
}

