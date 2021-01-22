const commonjs = require("rollup-plugin-commonjs");
const buildHelper = require("@egjs/build-helper");

export default buildHelper([
	{
		input: "./src/vue-imready/index.ts",
		output: "./dist/imready.cjs.js",
		format: "cjs",
		exports: "named",
		external: {
			"vue": "vue",
			"@egjs/imready": "@egjs/imready",
		}
	},
	{
		input: "./src/vue-imready/index.ts",
		output: "./dist/imready.esm.js",
		format: "esm",
		exports: "named",
		external: {
			"vue": "vue",
			"@egjs/imready": "@egjs/imready",
		}
	},
]);

