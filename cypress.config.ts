import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://weathershopper.pythonanywhere.com/',
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
