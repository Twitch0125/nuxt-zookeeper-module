import ZookeeperModule from "zookeeper";
const { Promise: Zookeeper } = ZookeeperModule;

export default defineNitroPlugin(async (nitroApp) => {
  const zkRuntimeConfig = useRuntimeConfig().zookeeper;
  const config = zkRuntimeConfig.config;
  const privateVariables = zkRuntimeConfig.variables;
  const publicVariables = useRuntimeConfig().public.zookeeper.variables;
  const client = new Zookeeper(config);
  await new Promise((resolve) => {
    client.init({});
    client.on("connect", () => {
      resolve(true);
    });
  });
  //iterate through public variables first
  if (publicVariables) {
    await readVariables(publicVariables, true);
  }
  await readVariables(privateVariables);
});

async function readVariables(variables: Record<string, string>) {
  const storage = useStorage(zkRuntimeConfig.namespace);
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
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_metadata, data] = (await client.get(path, false)) as [
        object,
        Buffer
      ];
      const value = data.toString();
      storage.setItem(name, value);
    })
  );
}
