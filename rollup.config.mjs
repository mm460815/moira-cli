import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import  nodeResolve  from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser"
import json from "@rollup/plugin-json";
import nodeExternals  from "rollup-plugin-node-externals";

export default defineConfig([
    {
        input: {index:"src/index.ts"}, // 入口文件
        output: [
            {
               dir: "dist", // 输出目录 
                format: "cjs",
                sourcemap: true, // 生成sourcemap
            },
        ],
        plugins:[
           nodeResolve(), // 解析第三方模块
           nodeExternals ({
               devDeps: false, // 识别package.json中的devDependencies
           }), // 将第三方模块排除
            commonjs(), // 将commonjs模块转换为es6模块
            typescript(), // 将ts转换为js
            json(), // 解析json文件
            terser(), // 压缩代码
        ]
    }
])