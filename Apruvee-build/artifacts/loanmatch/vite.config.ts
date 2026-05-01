import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function siteAnalyticsHtmlPlugin(env: Record<string, string>): Plugin {
  return {
    name: "loanmatch:site-analytics-html",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const ga4Id = env.VITE_GA4_MEASUREMENT_ID;
        const googleVerify = env.VITE_GOOGLE_SITE_VERIFICATION;
        const bingVerify = env.VITE_BING_SITE_VERIFICATION;

        const headTags: string[] = [];

        if (googleVerify) {
          headTags.push(
            `<meta name="google-site-verification" content="${googleVerify}" />`,
          );
        }
        if (bingVerify) {
          headTags.push(
            `<meta name="msvalidate.01" content="${bingVerify}" />`,
          );
        }
        if (ga4Id) {
          headTags.push(
            `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>`,
            `<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}', { send_page_view: false });
</script>`,
          );
        }

        if (headTags.length === 0) return html;
        return html.replace("</head>", `${headTags.join("\n    ")}\n  </head>`);
      },
    },
  };
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");

  return {
    base: "/",
    plugins: [
      react(),
      tailwindcss(),
      siteAnalyticsHtmlPlugin(env),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      allowedHosts: true,
    },
    preview: {
      port: 3000,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
