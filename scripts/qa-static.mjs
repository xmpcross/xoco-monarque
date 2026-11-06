import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const root = process.cwd();
const distDir = join(root, "dist");
const publicDir = join(root, "public");

const fail = (message) => {
  console.error(message);
  process.exitCode = 1;
};

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const routeToFile = (href) => {
  const cleanHref = href.split("#")[0].split("?")[0];
  if (!cleanHref || !cleanHref.startsWith("/") || cleanHref.startsWith("//")) return undefined;
  if (/\.[a-z0-9]+$/i.test(cleanHref)) return join(distDir, cleanHref);
  return join(distDir, cleanHref, "index.html");
};

if (!existsSync(distDir)) {
  fail("dist/ does not exist. Run npm run build before npm run qa:static.");
} else {
  const files = walk(distDir);
  const htmlFiles = files.filter((file) => extname(file) === ".html");
  const brokenLinks = [];
  const metadataErrors = [];

  htmlFiles.forEach((file) => {
    const html = readFileSync(file, "utf8");
    const label = relative(root, file).split(sep).join("/");

    [
      [/<title>[^<]+<\/title>/i, "title"],
      [/<meta name="description" content="[^"]+"/i, "meta description"],
      [/<link rel="canonical" href="[^"]+"/i, "canonical"],
      [/<meta property="og:title" content="[^"]+"/i, "Open Graph title"],
      [/<meta property="og:image" content="[^"]+"/i, "Open Graph image"],
    ].forEach(([pattern, name]) => {
      if (!pattern.test(html)) metadataErrors.push(`${label}: missing ${name}`);
    });

    const linkMatches = html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g);
    for (const [, href] of linkMatches) {
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("data:") ||
        href.startsWith("#")
      ) {
        continue;
      }

      const target = routeToFile(href);
      if (!target) continue;
      if (!existsSync(target) && !existsSync(join(publicDir, href))) {
        brokenLinks.push(`${label}: ${href}`);
      }
    }
  });

  if (metadataErrors.length > 0) {
    fail(`Static metadata QA failed:\n${metadataErrors.join("\n")}`);
  }

  if (brokenLinks.length > 0) {
    fail(`Static internal link QA failed:\n${brokenLinks.join("\n")}`);
  }

  if (process.exitCode !== 1) {
    console.log(`Static QA passed for ${htmlFiles.length} HTML files.`);
  }
}
