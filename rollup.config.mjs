import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';
import external from "rollup-plugin-peer-deps-external";
import css from "rollup-plugin-import-css";
import scss from 'rollup-plugin-scss';
// import resolve from "@rollup/plugin-node-resolve";
// import json from '@rollup/plugin-json';
// import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: 'json' };

/**
 * Using rollup: ES module bundler
 * https://rollupjs.org/configuration-options/
 * 
 * - To make this file works in ES style:
 *      - add "type": "module" to package.json
 *          - not work for docs project since it is using common js
 *      - so change extension to .mjs
 * - run with -config: rollup -c
 */
/** @type {import('rollup').RollupOptions} */
export default [
    {
        input: packageJson.source,
        output: [
            // compile to those file formats
            {
                // CommonJS module, suitable for Node
                file: packageJson.main,     // file name to use
                format: "cjs",
                sourcemap: true,
            },

            // compile to an ES module, can be used for <script type=module>
            {
                file: packageJson.module,
                format: "es",
                sourcemap: true,
            },

            // A self-executing function, suitable for <script> tag browser format
            // {
            //     file: 'dist/bundle.js',
            //     format: 'iife',     //immediately-invoked Function Expression
            //     name: "MyBundle",
            //     sourcemap: true,
            //     globals: {
            //         react: 'React',
            //         animejs: 'animejs'
            //     }
            // }

            // amd – Asynchronous Module Definition, used with module loaders like RequireJS
            // system – Native format of the SystemJS loader (alias: systemjs)
            // umd – Universal Module Definition, works as amd, cjs and iife all in one
        ],

        // indicate which modules should be treated as external
        external: ['popmotion'],

        plugins: [
            // bring external modules source code to the output, not necessary for this library 
            // resolve(),

            // convert CommonJS to ES2015 before Rollup can process them.
            commonjs(),

            typescript({ tsconfig: "./tsconfig.build.json" }),

            terser(),       // minify output

            scss({
                fileName: 'bundle.css'
            }), // will output compiled styles to output.css

            // css(),

            // automatically add a library's peerDependencies to its bundle's external config
            external(),

            // source code have json files import
            // json(),
        ],
    },

    // defines how our libraries types are distributed and uses the dts plugin to do so
    // {
    //     input: "dist/types/index.d.ts",
    //     output: [{ file: "dist/index.d.ts", format: "esm" }],
    //     plugins: [dts()],
    // },
];