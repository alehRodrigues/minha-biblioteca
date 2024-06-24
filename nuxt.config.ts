// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  experimental: { clientNodeCompat: true },
  ssr: false,
  router: {
    options: {
      hashMode: true,
    }
  },
  modules: ["vuetify-nuxt-module", "@nuxt/eslint", "nuxt-electron", '@morev/vue-transitions/nuxt'],
  electron: {
    build: [
      {
        entry: "./electron/main.ts",
        vite: {
          build: {
            rollupOptions: {
              external: ["bcryptjs", "better-sqlite3", "Buffer", "buffer"],
            }
          }
        },
      },
      {
        entry: "./electron/preload.ts",
        onstart(options) {
          options.reload()
        },
        vite: {
          build: {
            rollupOptions: {
              external: ["bcryptjs", "better-sqlite3", "Buffer", "buffer"],
            }
          }
        },
      }
    ]
  },
  app: {
    baseURL: "./",
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        // { "http-equiv": "content-security-policy", content: "default-src 'self'; script-src 'self'" },
        // { "http-equiv": "x-content-security-policy", content: "default-src 'self'; script-src 'self'" },
      ]
    }
  }
})


