import { defineEventHandler, useStorage } from "#imports";
export default defineEventHandler(async (event) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const publicStorage = useStorage("zookeeper_public");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const privateStorage = useStorage("zookeeper");
  return {
    // "app-name": await publicStorage.getItem("app-name"),
    // "app-secret": await privateStorage.getItem("app-secret"),
    "app-name": event.context.zookeeper.public['app-name'],
    "app-secret": event.context.zookeeper['app-secret'],
  };
});
