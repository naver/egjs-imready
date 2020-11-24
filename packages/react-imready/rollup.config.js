
// imready.js
// imready.min.js
// imready.pkgd.js
// imready.pkgd.min.js
// imready.esm.js


const buildHelper = require("@egjs/build-helper");

export default buildHelper([
	{
		input: "./src/react-imready/index.tsx",
		output: "./dist/imready.cjs.js",
		format: "cjs",
		exports: "named",
	},
	{
		input: "./src/react-imready/index.tsx",
		output: "./dist/imready.esm.js",
		format: "esm",
		exports: "named",
	},
]);

