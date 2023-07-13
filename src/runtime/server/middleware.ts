import { useRuntimeConfig, defineEventHandler, useStorage } from "#imports";
import type { Storage } from "unstorage";

export default defineEventHandler(async (event) => {
  const namespace = useRuntimeConfig().zookeeper.namespace;
  //prevent re-fetching variables if they are already present on the request event
  if (event.context[namespace]) {
    return;
  }
  const publicValues = await getStorageValues(
    useStorage(`${namespace}_public`)
  );
  const privateValues = await getStorageValues(useStorage(`${namespace}`));
  event.context[namespace] = { ...privateValues, public: publicValues };
});

async function getStorageValues(storage: Storage) {
  const keys = await storage.getKeys();
  const values: Record<string, string> = {};
  await Promise.all(
    keys.map(async (key) => {
      const value = await storage.getItem(key);
      values[key] = value;
    })
  );
  return values;
}
