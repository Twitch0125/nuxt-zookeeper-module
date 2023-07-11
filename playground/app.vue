<template>
  <div>
    Nuxt module playground!
  </div>
  <div>
    env: {{ env }}
  </div>
</template>

<script setup>
import { useFetch } from "#imports";
const { data: env } = await useFetch("/api/env");
</script>
