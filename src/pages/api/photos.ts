export async function GET({ url }: { url: URL }) {
  const albumId = url.searchParams.get("albumId") || "a1";
  const page = Number(url.searchParams.get("page") || "1");
  const pageSize = 20;
  const total = 60;
  const baseIndex = (page - 1) * pageSize;
  const data = Array.from({ length: pageSize }, (_, i) => {
    const idx = baseIndex + i + 1;
    return {
      id: `p${idx}`,
      albumId,
      src: `/images/${albumId}/${idx}.jpg`,
      width: 1600,
      height: 1067,
      lqip: "",
      dominantColor: "#ccc",
      tags: []
    };
  });
  return new Response(JSON.stringify({ data, meta: { page, pageSize, total } }), {
    headers: { "Content-Type": "application/json", "X-API-Version": "v1" }
  });
}

