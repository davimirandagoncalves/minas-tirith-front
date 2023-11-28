const webpack = require('webpack')

module.exports = {
  plugins: [new webpack.EnvironmentPlugin([
      "API_KEY",
      "AUTH_DOMAIN",
      "PROJECT_ID",
      "STORAGE_BUCKET",
      "MESSAGING_SENDER_ID",
      "APP_ID",
      "MEASUREMENT_ID"
    ])],
};