const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://front.serverest.dev',
    baseUrlApi: process.env.CYPRESS_BASE_URL_API || 'https://serverest.dev',
    setupNodeEvents(on, config) {
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
}) 