import { defineNuxtModule, createResolver, addServerPlugin } from "@nuxt/kit";
import { defu } from "defu";
import ZookeeperModule from "zookeeper";
const { constants } = ZookeeperModule;
// Module options TypeScript interface definition
/**
 * Extends config options from node-zookeeper
 * @see https://github.com/yfinkelstein/node-zookeeper/tree/master */
export interface ModuleOptions {
  config: {
    /** host url */
    connect?: string;
    /** number of ms */
    timeout?: number;
    /** TBD */
    host_order_deterministic?: boolean;
    /** TBD
     * @see https://github.com/yfinkelstein/node-zookeeper/blob/master/lib/zookeeper.js#L556-L574
     */
    debug_level?: number;
  };
  variables: VariablesConfig;
  /** by default, variables are accessible under a 'zookeeper' namespace in the runtimeConfig. You can change that here */
  namespace: "zookeeper" | string;
}
interface VariablesConfig extends Record<string, string | unknown> {
  /** variables are private by default. define variables under the 'public' key if they must be read client-side. */
  public?: Record<string, string>;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-zookeeper-module",
    configKey: "zookeeper",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    config: {
      connect: "",
      timeout: 5000,
      host_order_deterministic: false,
      debug_level: constants.ZOO_LOG_LEVEL_INFO,
    },
    namespace: "zookeeper",
    variables: {
      public: {},
    },
  },
  async setup(options, nuxt) {
    nuxt.options.runtimeConfig.public = defu(
      nuxt.options.runtimeConfig.public,
      {
        zookeeper: {
          variables: options.variables.public,
        },
      }
    );
    delete options.variables.public;
    nuxt.options.runtimeConfig = defu(nuxt.options.runtimeConfig, {
      zookeeper: {
        variables: options.variables,
        config: options.config,
        namespace: options.namespace,
      },
    });

    nuxt.options.nitro = defu(nuxt.options.nitro, {
      storage: {
        [options.namespace]: {
          driver: "memory",
        },
      },
    });

    //node-zookeeper is currently common-js only
    nuxt.options.build.transpile.push("zookeeper");

    const resolver = createResolver(import.meta.url);
    addServerPlugin(resolver.resolve("./runtime/plugin.server.ts"));
  },
});
