import { defineEventHandler, useStorage } from "#imports";
export default defineEventHandler(async () => {
  const storage = useStorage("zookeeper");
  return {
    name: await storage.getItem("app-name"),
    secret: await storage.getItem("app-secret"),
  };
});
