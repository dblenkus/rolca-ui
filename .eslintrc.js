module.exports = {
    root: true,
    extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    rules: {
        'prettier/prettier': 'warn',
    },
};
