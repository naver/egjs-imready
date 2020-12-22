
// imready.js
// imready.min.js
// imready.pkgd.js
// imready.pkgd.min.js
// imready.esm.js


const buildHelper = require("@egjs/build-helper");
const name = "eg.ImReady";

export default buildHelper([
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/imready.js",
		format: "umd",
		resolve: true,
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/imready.min.js",
		format: "umd",
		uglify: true,
		resolve: true,
	},
	{
		input: "./src/index.umd.ts",
		output: "./dist/imready.cjs.js",
		format: "cjs",
		exports: "default",
	},
	{
		input: "./src/index.ts",
		output: "./dist/imready.esm.js",
		format: "esm",
		exports: "named",
	},
]);

