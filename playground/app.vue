<template>
  <div>
    <h1>nuxt-zookeeper-module</h1>
    <p>
      Check the nuxt devtools and inspect the payload to see the values set by
      this module :)
    </p>
    <h2>server-side state</h2>
    <p>
      variables are private by default, so they're only accessible server-side.
      You can access them with unstorage, or on the event context
    </p>
    <pre>
      await useStorage('zookeeper').getItem('app-secret') 
      await useStorage('zookeeper_public').getItem('app-name') 

      event.context.zookeeper['app-secret']
      event.context.zookeeper.public['app-name']

    </pre>
    <p>
      There's a <code>/api/env</code> endpoint in this playground that returns
      public and private variables
      <button @click="() => execute()">
        fetch
      </button>
    </p>
    <pre>
      {{ JSON.stringify(fetchedVariables || {}) }}
    </pre>

    <h2>client-side state</h2>
    <p>
      This module provides a client-side value with your public variables. It's
      defined with <code>useState</code> under the
      <code>zookeeper-env</code> key.
    </p>
    <pre>
      {{ JSON.stringify(env) }}
    </pre>
  </div>
</template>

<script setup>
import { useFetch, useState } from "#imports";
const env = useState("zookeeper-env");
const { data: fetchedVariables, execute } = useFetch("/api/env", {
  immediate: false,
});
</script>

<style>
html {
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.75rem;
}
code,
pre {
  color: hsla(120, 20%, 40%);
  letter-spacing: 0.05em;
}
code {
  font-weight: bold;
}
pre {
  line-height: 2rem;
  font-weight: normal;
}
</style>
