// Minimal endpoint for the contact page's latency widget.
export async function GET() {
  return new Response(null, {
    status: 204,
    headers: { "cache-control": "no-store" },
  });
}
