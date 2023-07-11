export default defineNuxtConfig({
  modules: ["../src/module"],
  zookeeper: {
    config: {
      connect: "localhost:2181",
    },
    variables: {
      "/app/secret": "secret",
      public: {
        "/app/name": "nuxt-zookeeper-app",
      },
    },
  },
  devtools: { enabled: true },
});
