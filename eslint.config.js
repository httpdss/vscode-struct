const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
    {
        files: ["**/*.ts"],
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 6,
            sourceType: "module",
        },
        rules: {
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "import",
                    format: ["camelCase", "PascalCase"],
                },
            ],
            "curly": "warn",
            "eqeqeq": "warn",
            "no-throw-literal": "warn",
        },
    },
    {
        ignores: ["out/", "dist/", "**/*.d.ts"],
    },
];
