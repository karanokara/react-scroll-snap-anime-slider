import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
// import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: 'json' };

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        external: ['react', 'react-dom', 'animejs'],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.build.json" }),
        ],
    },

    // defines how our libraries types are distributed and uses the dts plugin to do so
    // {
    //     input: "dist/types/index.d.ts",
    //     output: [{ file: "dist/index.d.ts", format: "esm" }],
    //     plugins: [dts()],
    // },
];