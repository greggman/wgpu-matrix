import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'}));
const banner = `/* wgpu-matrix@${pkg.version}, license MIT */`;
const ver = `${/^(\d+)\./.exec(pkg.version)[1]}.x`;

const plugins = [
    typescript({ tsconfig: './tsconfig.json' }),
];

const minPlugins = [
    ...plugins,
    terser(),
];

export default [
    {
        input: 'src/wgpu-matrix.ts',
        output: [
            {
                file: `dist/${ver}/wgpu-matrix.module.js`,
                format: 'esm',
                sourcemap: true,
                banner,
                freeze: false,
            },
        ],
        plugins,
    },
    {
        input: 'src/wgpu-matrix.ts',
        output: [
            {
                name: 'wgpuMatrix',
                file: `dist/${ver}/wgpu-matrix.js`,
                format: 'umd',
                sourcemap: true,
                banner,
                freeze: false,
            },
        ],
        plugins,
    },
    {
        input: 'src/wgpu-matrix.ts',
        output: [
            {
                file: `dist/${ver}/wgpu-matrix.module.min.js`,
                format: 'esm',
                sourcemap: true,
                banner,
                freeze: false,
            },
        ],
        plugins: minPlugins,
    },
    {
        input: 'src/wgpu-matrix.ts',
        output: [
            {
                name: 'wgpuMatrix',
                file: `dist/${ver}/wgpu-matrix.min.js`,
                format: 'umd',
                sourcemap: true,
                banner,
                freeze: false,
            },
        ],
        plugins: minPlugins,
    },
];
