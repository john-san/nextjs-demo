import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphqlzero.almansi.me/api",
  documents: "gql/{queries,mutations}/*.ts",
  generates: {
    "gql/__generated__/": {
      preset: "client",
      plugins: [],
    },
    "gql/__generated__/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
