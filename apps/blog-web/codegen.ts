import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // 如果后端在线，从 URL 读取；如果离线，从本地 JSON 读取
  // schema:
  //   process.env.NODE_ENV === "development"
  //     ? "http://localhost:8000/graphql"
  //     : "./graphql.schema.json",
  // 开发阶段直接强制指向本地后端或实时的 gql 文件
  schema: "http://localhost:8000/graphql",
  documents: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
  generates: {
    // 生成类型定义（给 TS 用）
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        avoidOptionals: {
          field: true, // 强制查询结果中的字段必须存在
          object: true, // 强制对象定义中的字段必须存在
        },
        skipTypename: true, // 生成类型时不包含 __typename
        scalars: {
          DateTime: "Date", // 将后端的 DateTime 映射为 TS 的 Date
        },
        strictScalars: true,
      },
    },
    // 生成 Schema 镜像（给插件和工具用）
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
