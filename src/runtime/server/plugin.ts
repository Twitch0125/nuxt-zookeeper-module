import { defineNitroPlugin, useRuntimeConfig, useStorage } from "#imports";
import { createClient, type Client } from "node-zookeeper-client";

export default defineNitroPlugin(async () => {
  const zkRuntimeConfig = useRuntimeConfig().zookeeper;
  const { connectionString, ...config } = zkRuntimeConfig.config;
  const privateVariables = zkRuntimeConfig.variables;
  const publicVariables = useRuntimeConfig().public.zookeeper.variables;
  const client = createClient(connectionString, config);
  const connectPromise = new Promise<void>((resolve) => {
    client.once("connected", () => {
      console.log("zookeeper: connected");
      resolve();
    });
    client.connect();
  });
  await connectPromise;
  if (publicVariables) {
    await readVariables(client, publicVariables, true);
  }
  await readVariables(client, privateVariables);
  const disconnectPromise = new Promise<void>((resolve) => {
    client.once("disconnected", () => {
      console.log("zookeeper: disconnected");
      resolve();
    });
    client.close();
  });
  await disconnectPromise;
});

async function readVariables(
  client: Client,
  variables: Record<string, string>,
  isPublic: boolean = false
) {
  const namespace = useRuntimeConfig().zookeeper.namespace;
  const storage = isPublic
    ? useStorage(`${namespace}_public`)
    : useStorage(namespace);
  await Promise.all(
    Object.entries(variables).map(async ([path, name]) => {
      if (typeof name !== "string") {
        console.error(
          `zookeeper: value for zookeeper path ${path} should be a string. Maybe you have something wrong in your nuxt config?`
        );
        return;
      }
      const doesExist = await new Promise((resolve) => {
        client.exists(path, (error, stat) => {
          if (error || !stat) {
            resolve(false);
          }
          resolve(stat);
        });
      });
      if (!doesExist) {
        console.log("zookeeper: could not find", path);
        return;
      }
      const data = await new Promise<Buffer>((resolve, reject) => {
        client.getData(path, (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        });
      });
      const value = data.toString();
      console.log("zookeeper: found", path, value);
      await storage.setItem(name, value);
    })
  );
}
