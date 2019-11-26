module.exports = {
    apps : [{
      name: "LoraApp",
      script: "./dist/main.js",
      instances: "2",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
}