module.exports = {
  apps: [
    {
      name: "richai-claimers-api",
      script: "./index.js",
      watch: false,
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      max_memory_restart: "1G",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};