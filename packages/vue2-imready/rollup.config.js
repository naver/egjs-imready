const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  sourcemap: true,
  input: "./src/index.ts",
  exports: "named",
  commonjs: true,
  external: {
    "vue": "vue",
    "@vue/composition-api": "@vue/composition-api",
    "@egjs/imready": "@egjs/imready",
  }
};
export default buildHelper([
    {
        ...defaultOptions,
        format: "es",
        output: "./dist/imready.esm.js",
    },
    {
        ...defaultOptions,
        format: "cjs",
        output: "./dist/imready.cjs.js",
    },
]);
