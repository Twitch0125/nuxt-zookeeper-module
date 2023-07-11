import { defineNuxtPlugin, useState } from "#imports";

export default defineNuxtPlugin(async () => {
  const state = useState("env", () => ({}));
  const env = await $fetch('/api/env')
  state.value = env
});
