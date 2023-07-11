<template>
  <div>
    Nuxt module playground!
    {{ publicVars }}
  </div>
</template>

<script setup>
import { useRuntimeConfig } from "#imports";
const publicVars = useRuntimeConfig().public.zookeeper;
</script>
