export default defineNuxtConfig({
  modules: ["../src/module"],
  zookeeper: {
    config: {
      connect: "localhost:2181",
    },
    variables: {
      "/app/secret": "app-secret",
      public: {
        "/app/name": "app-name",
      },
    },
  },
  devtools: { enabled: true },
});
