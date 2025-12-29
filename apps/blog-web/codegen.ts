import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // 如果后端在线，从 URL 读取；如果离线，从本地 JSON 读取
  schema:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/graphql"
      : "./graphql.schema.json",
  documents: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
  generates: {
    // 生成类型定义（给 TS 用）
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
    // 生成 Schema 镜像（给插件和工具用）
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
