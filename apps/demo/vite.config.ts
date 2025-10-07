import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ["@distributedgallery/ui"],
	},
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd())],
		},
	},
});
