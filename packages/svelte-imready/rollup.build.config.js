import buildHelper from "@egjs/build-helper";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

const defaultOptions = {
	tsconfig: "",
	commonjs: true,
	external: {
		svelte: "svelte",
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess(),
		}),
	],
};

export default buildHelper([
	{
		...defaultOptions,
		input: "./src/svelte-imready/index.ts",
		output: "dist/imready.cjs.js",
		format: "cjs",
		exports: "named",
	},
	{
		...defaultOptions,
		input: "./src/svelte-imready/index.ts",
		output: "dist/imready.esm.js",
		format: "es",
		exports: "named",
	},
]);
