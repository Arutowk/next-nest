import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  //import 分类排序
  {
    // 1. 注册插件
    plugins: {
      // 键名 'import' 用于规则前缀
      import: pluginImport,
    },
    ignores: ["src/components/ui/**"],
    // 2. 配置规则
    rules: {
      "import/order": [
        "error",
        {
          // 导入组的顺序，与你提供的配置一致
          groups: [
            "builtin", // Node.js 内置模块 (e.g., 'fs', 'path')
            "external", // 外部/第三方模块 (e.g., 'react', 'lodash')
            "type",
            "internal", // 项目内部模块 (通过 pathGroups 或别名定义的)
            "parent", // 父级目录引用 (e.g., '../')
            "sibling", // 兄弟目录引用 (e.g., './')
            "index", // 当前目录文件引用 (e.g., './index.js')
          ],
          // 可选：添加 newlines-between 增强可读性
          "newlines-between": "always",
          // 字母排序设置
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    plugins: {
      tslint: tseslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          // 关键配置：设置为 "none" 将忽略 catch 块中的变量检查
          caughtErrors: "none",
          // 关键配置：当使用 ...rest 时，解构出的其他变量会被忽略
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ignores: [
      "dist/**",
      ".*.js",
      "*.config.js",
      ".turbo/",
      "node_modules/**",
      ".husky/",
      ".next/",
      "coverage/",
      "src/components/ui/**",
      "src/components/tiptap*/**",
    ],
  },
];
