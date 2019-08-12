import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import copy from "rollup-plugin-cpy";

export default {
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
    format: "iife"
  },
  plugins: [
    resolve(),
    commonjs(),
    uglify(),
    copy({
      files: ["src/*.html", "src/*.json"],
      dest: "public"
    })
  ]
};
