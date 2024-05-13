module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "chakra-ui"],
    parserOptions: {
        project: true,
    },
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            {
                allowConstantExport: true,
            },
        ],
        "chakra-ui/props-order": "error",
        "chakra-ui/props-shorthand": "error",
        "chakra-ui/require-specific-component": "error",
    },
};
