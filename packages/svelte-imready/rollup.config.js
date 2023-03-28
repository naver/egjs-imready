import buildHelper from "@egjs/build-helper";

const defaultOptions = {
	tsconfig: "",
	commonjs: true,
	external: {
		svelte: "svelte",
	},
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
