import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  auth: true,
  buckets: {
    "livros-privados": { access: "private" },
  },
  functions: {
    livrosapi: {
      source: "books-api",
    },
  },
});
