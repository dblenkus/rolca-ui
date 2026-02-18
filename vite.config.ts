import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'tss-react/mui-compat': path.resolve(__dirname, 'src/styles/muiCompat.tsx'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: [
                'src/store/**/*.ts',
                'src/store/**/*.tsx',
                'src/services/*.ts',
                'src/services/*.tsx',
                'src/hooks/useKeyPress.ts',
                'src/utils/async.ts',
                'src/utils/fetchAll.ts',
                'src/utils/image.ts',
            ],
            exclude: ['src/store/index.ts', 'src/store/**/types.ts', 'src/services/Base.ts'],
            thresholds: {
                branches: 90,
                functions: 90,
                lines: 90,
                statements: 90,
            },
        },
    },
});
