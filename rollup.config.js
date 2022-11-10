import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'}));
const banner = `/* wgpu-matrix@${pkg.version}, license MIT */`;

const plugins = [
    typescript({ tsconfig: './tsconfig.json' }),
];

export default [
    {
        input: 'src/wgpu-matrix.ts',
        output: [
            {
                file: 'dist/1.x/wgpu-matrix.module.js',
                format: 'esm',
                sourcemap: true,
                banner,
            },
        ],
        plugins,
    },
    {
        input: 'src/wgpu-matrix.ts',
        output: [
            {
                name: 'wgpuMatrix',
                file: 'dist/1.x/wgpu-matrix.js',
                format: 'umd',
                sourcemap: true,
                banner,
            },
        ],
        plugins,
    },
];
