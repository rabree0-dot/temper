import app from "./app";
import { env } from "./config/env";
import { log } from "./utils/logger";

const server = app.listen(env.port, () => {
  log.info(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
  log.info(`API: http://localhost:${env.port}/api`);
});

process.on("unhandledRejection", (reason) => {
  log.error("Unhandled rejection", reason);
});

process.on("uncaughtException", (error) => {
  log.error("Uncaught exception", error);
  server.close(() => process.exit(1));
});
