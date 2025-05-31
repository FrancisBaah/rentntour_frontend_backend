module.exports = {
  apps: [
    {
      name: "rnt_backend",
      script: "index.js",
      watch: true,
      ignore_watch: ["node_modules", ".git"],
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
    },
  ],
};
