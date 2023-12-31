import {
  defineNuxtModule,
  createResolver,
  addServerPlugin,
  addPlugin,
  addServerHandler,
} from "@nuxt/kit";
import { defu } from "defu";
// Module options TypeScript interface definition
/**
 * Extends config options from node-zookeeper-client
 * @see https://github.com/alexguan/node-zookeeper-client#client-createclientconnectionstring-options */
export interface ModuleOptions {
  config: {
    /** host url */
    connectionString?: string;
    /** Session timeout in milliseconds @default 30000 */
    sessionTimeout?: number;
    /** The delay (in milliseconds) between each connection attempts. @default 1000*/
    spinDelay?: number;
    /** The number of retry attempts for connection loss exception. @default 0 */
    retries?: number;
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
      sessionTimeout: 30000,
      spinDelay: 1000,
      retries: 0,
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
    const resolver = createResolver(import.meta.url);
    addServerPlugin(resolver.resolve("./runtime/server/plugin"));
    addServerHandler({
      middleware: true,
      handler: resolver.resolve("./runtime/server/middleware"),
    });
    addPlugin(resolver.resolve("./runtime/plugin.server"));
  },
});
