import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
	base:'/',
	vite: {
		server: {
			host: '0.0.0.0',
			allowedHosts: true,
			strictPort: false,
		},
	},
});
