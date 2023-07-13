import { defineNuxtPlugin, useRequestEvent, useState, useRuntimeConfig } from "#imports";

export default defineNuxtPlugin(async () => {
  const namespace = useRuntimeConfig().zookeeper.namespace;
  const state = useState(`${namespace}-env`, () => ({}));
  const env = useRequestEvent().context[namespace];

  state.value = env.public;
});
