import { defineNitroPlugin, useRuntimeConfig, useStorage } from "#imports";
import Zookeeper from "zookeeper";
export default defineNitroPlugin(async () => {
  const zkRuntimeConfig = useRuntimeConfig().zookeeper;
  const config = zkRuntimeConfig.config;
  const privateVariables = zkRuntimeConfig.variables;
  const publicVariables = useRuntimeConfig().public.zookeeper.variables;
  const client = new Zookeeper(config);
  await new Promise((resolve) => {
    client.init({});
    client.on("connect", () => {
      console.log("connected to zookeeper");
      resolve(true);
    });
  });
  //iterate through public variables first
  await Promise.all([
    readVariables(client, publicVariables),
    readVariables(client, privateVariables),
  ]);
  await client.close();
  console.log("closed zookeeper connection");
});

async function readVariables(
  client: Zookeeper,
  variables: Record<string, string>,
) {
  if(!variables) return;
  const storage = useStorage(useRuntimeConfig().zookeeper.namespace);
  await Promise.all(
    Object.entries(variables).map(async ([path, name]) => {
      if (typeof name !== "string") {
        console.error(
          `value for zookeeper path ${path} should be a string. Maybe you have something wrong in your nuxt config?`
        );
        return;
      }
      const doesExist = await client.pathExists(path, false);
      if (!doesExist) {
        console.log("unable to find ", path);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_metadata, data] = (await client.get(path, false)) as [
        object,
        Buffer
      ];
      const value = data.toString();
      await storage.setItem(name, value);
      console.log(name, await storage.getItem(name));
    })
  );
}
