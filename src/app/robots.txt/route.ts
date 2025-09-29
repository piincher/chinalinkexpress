import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.chinalinkexpress.com";

  const robots = `
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /login
Disallow: /register
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
