import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [pluginReact()],
	module: {
		rules: [{ test: /\.css$/, use: ["postcss-loader"], type: "css" }],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	source: {
		entry: { index: "./src/main.tsx" },
	},
	html: {
		template: "./index.html",
	},
	tools: {
		rspack: {
			plugins: [TanStackRouterRspack()],
		},
	},
});
