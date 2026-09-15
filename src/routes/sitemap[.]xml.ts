import { createFileRoute } from "@tanstack/react-router";
import { allIndexablePaths } from "@/lib/calculators/registry";
import { SITE_URL, joinUrl } from "@/lib/site";

function xmlEscape(s: string) {
  return s.split("&").join("&" + "amp;").split("<").join("&" + "lt;").split(">").join("&" + "gt;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = allIndexablePaths()
          .map((path) => {
            const loc = xmlEscape(joinUrl(SITE_URL, path));
            const priority = path === "/" ? "1.0" : path.split("/").length === 2 ? "0.8" : "0.6";
            return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
          })
          .join("\n");
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
